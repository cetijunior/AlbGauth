// src/components/common/QuestionInput.jsx
import React from 'react';
import { CalculatorIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const QuestionInput = ({ inputId }) => {
    return (
        <div
            id={inputId}
            className="flex items-center w-full max-w-lg border border-gray-300 hover:border-gray-800 rounded-2xl shadow-sm  p-2"
        >
            <input
                type="text"
                placeholder="Type your question..."
                className="flex-grow p-2 bg-transparent focus:outline-none"
            />
            <div className="flex items-center">
                <button className="text-gray-500 hover:text-gray-600">
                    <CalculatorIcon className="h-6 w-6" />
                </button>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <button className="text-blue-500 hover:text-blue-600">
                    <ArrowRightIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default QuestionInput;
