import React, { useState, useRef, useEffect } from 'react';
import { UserCircleIcon, ArrowRightOnRectangleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import BgUI from '../common/BgUI';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="focus:outline-none transition-colors duration-200 hover:scale-110"
            >
                <UserCircleIcon className="h-8 w-8 text-gray-300 hover:text-blue-400" />
            </button>
            {isOpen && (
                <div className="absolute -right-2 mt-6 w-80 bg-gradient-to-b rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform origin-top-right border border-gray-700"
                    style={{ background: '#000000' }}
                >

                    <div className="relative z-10">
                        <div className="p-4 flex justify-between items-center border-b border-gray-700">
                            <div className="flex items-center space-x-3">
                                <span className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-semibold shadow-inner">C</span>
                                <span className="text-gray-200 font-medium text-lg">CJ</span>
                            </div>
                            <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md">GET APP</button>
                        </div>
                        <div className="px-4 py-3">
                            <h3 className="text-sm font-semibold text-gray-400 mb-2">Basic Credits</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <span className="text-gray-300">Answers</span>
                                        <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer hover:text-gray-300" />
                                    </div>
                                    <span className="text-gray-300 font-medium">6 Today</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <span className="text-gray-300">Queries</span>
                                        <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer hover:text-gray-300" />
                                    </div>
                                    <span className="text-gray-300 font-medium">10 Today</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 border-t border-gray-700">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-semibold text-gray-400">Gauth Plus Free Credits</h3>
                                <a href="#" className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors duration-200">Get More &gt;</a>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <span className="text-gray-300">Super Gauth AI</span>
                                        <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer hover:text-gray-300" />
                                    </div>
                                    <span className="text-gray-300 font-medium">1</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <span className="text-gray-300 underline">PDF Helper</span>
                                        <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer hover:text-gray-300" />
                                    </div>
                                    <span className="text-gray-300 font-medium">10</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <span className="text-gray-300 underline">Writing Helper</span>
                                        <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer hover:text-gray-300" />
                                    </div>
                                    <span className="text-gray-300 font-medium">10</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 border-t border-gray-700">
                            <h3 className="text-sm font-semibold text-gray-400 mb-2">My Account</h3>
                            <div>
                                <a href="#" className="flex justify-between items-center text-gray-300 hover:bg-gray-700 rounded-md py-2 px-2 transition-colors duration-200">
                                    <span>Search history</span>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                                </a>
                            </div>
                        </div>
                        <div className="px-4 py-3 border-t border-gray-700">
                            <a href="#" className="flex items-center text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md py-2 px-2 transition-colors duration-200">
                                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                                Sign out
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
