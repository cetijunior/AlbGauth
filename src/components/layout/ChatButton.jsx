// src/components/layout/ChatButton.jsx
import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const ChatButton = () => {
    return (
        <button
            className="fixed z-50 bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition flex items-center"
            onClick={() => alert('Live chat coming soon!')}
        >
            <ChatBubbleLeftRightIcon className="h-10 w-10" />
        </button>
    );
};

export default ChatButton;
