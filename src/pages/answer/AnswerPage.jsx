import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import ShootingStars from '../../components/common/shootingStars';
import Tesseract from 'tesseract.js';
import HistorySidebar from '../../components/answer/HistorySidebar';

const AnswerPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { question, file } = location.state || {};

    const [input, setInput] = useState(question || '');
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(file);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');
    const [cohereAnswer, setCohereAnswer] = useState('');
    const [history, setHistory] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState('');

    useEffect(() => {
        if (question) {
            if (!currentAnswer) {
                handleSolve(question);
            } else {
                setCohereAnswer(currentAnswer);
            }
        }
        if (file) {
            handleFileUpload(file);
        }
        const savedHistory = JSON.parse(localStorage.getItem('answerHistory')) || [];
        setHistory(savedHistory);
    }, []);

    const handleSolve = async (text) => {
        setLoading(true);
        try {
            const answer = await solveWithCohere(text);
            setCohereAnswer(answer);
            setCurrentAnswer(answer); // Save the answer for future reloads
            saveToHistory(text, uploadedFile, answer);
        } catch (error) {
            console.error('Error solving question:', error);
        }
        setLoading(false);
    };

    const solveWithCohere = async (input) => {
        try {
            const apiKey = import.meta.env.VITE_COHERE_API_KEY;
            if (!apiKey) {
                throw new Error('Cohere API key is not set');
            }

            const response = await fetch('https://api.cohere.ai/v1/generate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'command-xlarge-nightly',
                    prompt: `Ju jeni një profesor nga Shqipëria. Ju lutem përgjigjuni pyetjes së mëposhtme në shqip rrjedhshëm, duke u përpjekur të jeni sa më i qartë dhe konciz që të jetë e mundur: "${input}"`,
                    max_tokens: 300,
                    temperature: 0.9,
                    k: 0,
                    stop_sequences: [],
                    return_likelihoods: 'NONE'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from Cohere API');
            }

            const data = await response.json();
            return data.generations[0].text;
        } catch (error) {
            console.error('Error processing question:', error);
            throw error;
        }
    };

    const handleFileUpload = async (file) => {
        if (file) {
            setUploadedFile(file);
            const reader = new FileReader();
            reader.onload = async (e) => {
                setPreviewUrl(e.target.result);
                const { data: { text } } = await Tesseract.recognize(e.target.result);
                setRecognizedText(text);
                handleSolve(text);
                saveToHistory(text, file, null);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveToHistory = (question, file, answer) => {
        const newHistoryItem = {
            id: Date.now(),
            question,
            file: file ? {
                name: file.name,
                type: file.type,
                size: file.size,
                dataUrl: file instanceof File ? URL.createObjectURL(file) : null
            } : null,
            answer,
            timestamp: new Date().toISOString(),
        };
        const updatedHistory = [newHistoryItem, ...JSON.parse(localStorage.getItem('answerHistory') || '[]')].slice(0, 10);
        localStorage.setItem('answerHistory', JSON.stringify(updatedHistory));
        setHistory(updatedHistory);
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setRecognizedText('');
        setPreviewUrl(null);
        setCohereAnswer('');
        setCurrentAnswer(''); // Clear the current answer on file removal
    };

    const handleClear = () => {
        setInput('');
        setUploadedFile(null);
        setRecognizedText('');
        setPreviewUrl(null);
        setCohereAnswer('');
        setCurrentAnswer(''); // Clear the current answer on clear
    };

    const loadHistoryItem = (item) => {
        setInput(item.question);
        setCohereAnswer(item.answer);
        setRecognizedText(item.question);
        if (item.file) {
            setUploadedFile(item.file);
            setPreviewUrl(item.file.dataUrl);
        }
    };

    const handleAskAgain = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-black p-4 sm:p-8 flex relative">
            <ShootingStars />
            <div className="flex-1 flex flex-col items-center relative z-10">
                <img src="/assets/images/Logo.png" alt="Zgjidhje.AI" className="w-auto h-32 mx-auto mb-4" />
                <p className="text-gray-600 mb-8 text-center text-2xl italic font-bold leading-relaxed">AI Assistant</p>
                <div className='flex flex-row justify-center items-center'>
                    <div className="flex justify-center items-center flex-row">
                        <div className="bg-gray-900 bg-opacity-80 rounded-lg shadow-lg p-4 sm:p-6 backdrop-filter backdrop-blur-lg w-full max-w-4xl">
                            <AnimatePresence mode="wait">
                                {/* File upload preview */}
                                {uploadedFile && (
                                    <motion.div
                                        key={`file-${uploadedFile.name}`}
                                        className="w-full mb-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="w-full p-6 bg-gray-800 rounded-xl shadow-inner">
                                            <h4 className="text-lg font-semibold mb-4 text-purple-300">Preview:</h4>
                                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-700 p-4 rounded-lg">
                                                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                                    {previewUrl && (
                                                        <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-lg shadow-md">
                                                            {uploadedFile.type.startsWith('image/') ? (
                                                                <img src={previewUrl} alt="Uploaded file preview" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gray-600 text-purple-400">
                                                                    <DocumentIcon className="h-10 w-10 md:h-12 md:w-12" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-200 mb-1">{uploadedFile.name}</span>
                                                        <span className="text-xs text-gray-400">Type: {uploadedFile.type}</span>
                                                        <span className="text-xs text-gray-400">Size: {(uploadedFile.size / 1024).toFixed(2)} KB</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Recognized text */}
                                {recognizedText && (
                                    <motion.div
                                        key={`recognized-${recognizedText}`}
                                        className="flex flex-col mt-6 p-6 bg-gray-800 rounded-xl shadow-md w-full"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-xl font-bold mb-3 text-purple-300">Recognized Text:</h3>
                                        <p className="text-white">{recognizedText}</p>
                                    </motion.div>
                                )}

                                {/* Loading indicator */}
                                {loading && (
                                    <motion.div
                                        key={`loading-${loading}`}
                                        className="mt-4 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                                        <p className="ml-2 text-sm text-purple-400">Processing with AI...</p>
                                    </motion.div>
                                )}

                                {/* Cohere answer */}
                                {cohereAnswer && (
                                    <motion.div
                                        key={`answer-${cohereAnswer}`}
                                        className="mt-6 p-6 bg-purple-900 rounded-xl shadow-md w-full"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-xl font-bold mb-3 text-purple-200">AI Answer:</h3>
                                        <p className="text-purple-300">{cohereAnswer}</p>
                                    </motion.div>
                                )}

                                {/* Action buttons */}
                                {(cohereAnswer || uploadedFile) && (
                                    <motion.div
                                        key={`actions-${cohereAnswer || uploadedFile}`}
                                        className="mt-6 flex justify-center space-x-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        <button
                                            className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300 flex items-center space-x-2"
                                            onClick={handleAskAgain}
                                        >
                                            <ArrowPathIcon className="w-5 h-5" />
                                            <span>Ask Again</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* History Sidebar */}
                    <HistorySidebar onLoadItem={loadHistoryItem} />
                </div>
            </div>
        </div>
    );
};

export default AnswerPage;