import React, { useState, useRef, useEffect } from 'react';
import { UserCircleIcon, ArrowRightOnRectangleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { motion, AnimatePresence } from 'framer-motion';

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
            <motion.button
                onClick={toggleDropdown}
                className="focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <UserCircleIcon className="h-8 w-8 text-gray-300 hover:text-blue-400" />
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -right-2 mt-6 w-80 bg-gradient-to-b rounded-3xl shadow-2xl overflow-hidden border border-gray-700"
                        style={{ background: '#000000' }}
                    >
                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="p-4 flex justify-between items-center border-b border-gray-700"
                            >
                                <div className="flex items-center space-x-3">
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-semibold shadow-inner"
                                    >
                                        C
                                    </motion.span>
                                    <span className="text-gray-200 font-medium text-lg">CJ</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
                                >
                                    GET APP
                                </motion.button>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="px-4 py-3"
                            >
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">Basic Credits</h3>
                                <div className="space-y-2">
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-gray-300">Answers</span>
                                            <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer hover:text-gray-300" />
                                        </div>
                                        <span className="text-gray-300 font-medium">6 Today</span>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-gray-300">Queries</span>
                                            <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer hover:text-gray-300" />
                                        </div>
                                        <span className="text-gray-300 font-medium">10 Today</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="px-4 py-3 border-t border-gray-700"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-sm font-semibold text-gray-400">Gauth Plus Free Credits</h3>
                                    <motion.a
                                        whileHover={{ scale: 1.05, color: "#ff6b6b" }}
                                        href="#"
                                        className="text-red-400 text-sm font-medium transition-colors duration-200"
                                    >
                                        Get More &gt;
                                    </motion.a>
                                </div>
                                <div className="space-y-2">
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-gray-300">Super Gauth AI</span>
                                            <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer hover:text-gray-300" />
                                        </div>
                                        <span className="text-gray-300 font-medium">1</span>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-gray-300 underline">PDF Helper</span>
                                            <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer hover:text-gray-300" />
                                        </div>
                                        <span className="text-gray-300 font-medium">10</span>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-gray-300 underline">Writing Helper</span>
                                            <QuestionMarkCircleIcon className="h-4 w-4 text-gray-500 ml-1 cursor-pointer hover:text-gray-300" />
                                        </div>
                                        <span className="text-gray-300 font-medium">10</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="px-4 py-3 border-t border-gray-700"
                            >
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">My Account</h3>
                                <div>
                                    <motion.a
                                        whileHover={{ x: 5, backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                                        href="#"
                                        className="flex justify-between items-center text-gray-300 rounded-md py-2 px-2 transition-colors duration-200"
                                    >
                                        <span>Search history</span>
                                        <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                                    </motion.a>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="px-4 py-3 border-t border-gray-700"
                            >
                                <motion.a
                                    whileHover={{ x: 5, backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                                    href="#"
                                    className="flex items-center text-red-400 rounded-md py-2 px-2 transition-colors duration-200"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                                    Sign out
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileDropdown;
