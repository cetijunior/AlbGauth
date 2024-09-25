import React from 'react';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

const UploadSection = () => {
    return (
        <div className="flex items-center justify-center w-full mb-6">
            <label
                htmlFor="fileUpload"
                className="flex flex-col w-full md:w-4/5 lg:w-3/5 items-center justify-center h-52 border-2 border-blue-300 border-dashed rounded-2xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <DocumentArrowUpIcon className="w-10 h-10 mb-3 text-blue-400" />
                    <p className="mb-2 text-sm text-blue-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-blue-400">PDF, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input type="file" id="fileUpload" className="hidden" />
            </label>
        </div>
    );
};

export default UploadSection;