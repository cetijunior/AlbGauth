import React from 'react';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

const UploadSection = () => {
    return (
        <div className="flex items-center justify-center w-full mb-6">
            <label
                htmlFor="fileUpload"
                className="flex flex-col w-full max-w-2xl md:w-4/5 lg:w-3/5 items-center justify-center h-52 border-2 border-gray-400 border-dashed rounded-2xl cursor-pointer bg-white hover:border-gray-800 transition group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <DocumentArrowUpIcon className="w-10 h-10 mb-3 text-blue-400" />
                    <p className="mb-2 text-sm text-blue-500">
                        Click to <span className="font-semibold group-hover:underline">upload</span> or <span className="group-hover:underline">drag and drop</span>
                    </p>
                    <p className="text-xs text-blue-400">PDF, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input type="file" id="fileUpload" className="hidden" />
            </label>
        </div>
    );
};

export default UploadSection;