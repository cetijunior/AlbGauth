// src/components/common/QuestionInput.jsx
import React, { useState } from 'react';
import { CalculatorIcon, ArrowRightIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuestionInput = ({ inputId }) => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [cohereAnswer, setCohereAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCalculatorClick = () => {
        navigate('/calculator');
    };

    const handleQuestionSubmit = async () => {
        setIsLoading(true);
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
                    prompt: `Ju jeni një profesor nga Shqipëria. Ju lutem përgjigjuni pyetjes së mëposhtme në shqip rrjedhshëm, duke u përpjekur të jeni sa më i qartë dhe konciz që të jetë e mundur: "${question}"`,
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
            const answer = data.generations[0].text;
            console.log('Cohere response:', answer);
            setCohereAnswer(answer);
        } catch (error) {
            console.error('Error processing question:', error);
            setCohereAnswer('Ndodhi një gabim gjatë përpunimit të pyetjes suaj. ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveAnswer = () => {
        setCohereAnswer('');
    };

    return (
        <motion.div
            className="w-full max-w-xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
        >
            <div
                id={inputId}
                className="flex items-center w-full border border-gray-700 hover:border-gray-500 rounded-2xl shadow-sm p-2 bg-gray-900"
            >
                <input
                    type="text"
                    placeholder="Shkruani pyetjen tuaj..."
                    className="flex-grow p-2 bg-transparent focus:outline-none text-white"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <div className="flex items-center">
                    <button
                        className="text-gray-400 hover:text-gray-200"
                        onClick={handleCalculatorClick}
                    >
                        <CalculatorIcon className="h-6 w-6" />
                    </button>
                    <div className="h-6 w-px bg-gray-700 mx-2"></div>
                    <button
                        className="text-gray-400 hover:text-blue-300"
                        onClick={handleQuestionSubmit}
                    >
                        <ArrowRightIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
            {isLoading && (
                <motion.div
                    className="mt-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-gray-300">Duke përpunuar pyetjen tuaj...</p>
                </motion.div>
            )}
            {cohereAnswer && !isLoading && (
                <div className="mt-4 p-4 bg-gray-900 rounded-lg shadow-md border border-gray-700">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-start justify-end">
                            <div className="bg-gray-800 rounded-lg p-3 shadow-sm max-w-[80%]">
                                <p className="text-sm text-gray-300">{question}</p>
                            </div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                                <UserCircleIcon />
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                            </div>
                            <div className="bg-blue-600 rounded-lg p-3 shadow-sm max-w-[80%]">
                                <p className="text-sm text-white">{cohereAnswer}</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="text-red-500 hover:text-red-400"
                                onClick={handleRemoveAnswer}
                            >
                                <TrashIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default QuestionInput;