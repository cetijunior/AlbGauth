import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, DocumentIcon, DocumentTextIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const SavedAnswerCard = ({ item, onClick, onDelete }) => {
    const [fileData, setFileData] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // Added state for previewUrl

    useEffect(() => {
        if (item.file) {
            const savedFile = localStorage.getItem(`file_${item.id}`);
            if (savedFile) {
                const parsedFile = JSON.parse(savedFile);
                setFileData(parsedFile);
                if (parsedFile.type.startsWith('image/')) {
                    setPreviewUrl(parsedFile.dataUrl); // Set previewUrl if file type is image
                }
            }
        }
    }, [item]);

    const handleDelete = () => {
        localStorage.removeItem(`file_${item.id}`);
        onDelete(item.id); // Call onDelete function to remove the item from the parent component
        // Ensure the parent component updates its state to reflect the deletion
    };

    return (
        <motion.div
            className="bg-gray-800 p-6 rounded-md mb-3 cursor-pointer hover:bg-gray-700 transition-colors duration-200 relative"
            onClick={() => onClick(item)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center mb-2">
                {fileData && fileData.type.startsWith('image/') ? (
                    <img src={previewUrl} alt="Uploaded file preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-purple-400">
                        <DocumentIcon className="h-10 w-10 md:h-8 md:w-8" />
                    </div>
                )}
                <p className="text-sm text-purple-200 truncate">{item.question}</p>
            </div>
            <div className="flex items-center text-xs text-gray-400">
                <ClockIcon className="h-3 w-3 mr-1" />
                <p>{new Date(item.timestamp).toLocaleString()}</p>
            </div>
            <button className="absolute top-0 right-0 m-2" onClick={handleDelete}>
                <TrashIcon className="h-5 w-5 text-red-500" />
            </button>
        </motion.div>
    );
};

export default SavedAnswerCard;
