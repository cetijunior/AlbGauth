// src/components/layout/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    HomeIcon,
    CalculatorIcon,
    DocumentTextIcon,
    PencilIcon,
    BookOpenIcon,
    NewspaperIcon,
    DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import BgUi from '../common/BgUI';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [showArrow, setShowArrow] = useState(false);
    const [arrowTimer, setArrowTimer] = useState(null);

    const menuItems = [
        { icon: HomeIcon, label: 'Home', path: '/' },
        { icon: DevicePhoneMobileIcon, label: 'Zgjidhje.ai', path: '/answer' },
        { icon: DocumentTextIcon, label: 'PDF Helper', path: '/pdf-helper' },
        { icon: PencilIcon, label: 'Writing Helper', path: '/writing-helper', hasSubmenu: true },
        { icon: CalculatorIcon, label: 'Calculator', path: '/calculator' },
        { icon: BookOpenIcon, label: 'Resources', path: '/resources', hasSubmenu: true },
        { icon: NewspaperIcon, label: 'Blog', path: '/blog' },
        { icon: DevicePhoneMobileIcon, label: 'App', path: '/app' },
    ];

    const handleMouseEnter = () => {
        setShowArrow(true);
        clearTimeout(arrowTimer);
    };

    const handleMouseLeave = () => {
        const timer = setTimeout(() => {
            setShowArrow(false);
        }, 2000); // Arrow stays visible for 2 seconds after hover
        setArrowTimer(timer);
    };

    useEffect(() => {
        return () => {
            if (arrowTimer) {
                clearTimeout(arrowTimer);
            }
        };
    }, [arrowTimer]);

    return (
        <motion.aside
            initial={{ width: isOpen ? '15rem' : '5rem' }}
            animate={{ width: isOpen ? '15rem' : '5rem' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`mt-16 z-50 text-gray-200 border-r border-gray-900 fixed top-0 left-0 shadow-lg flex flex-col hidden sm:flex`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ background: '#000000', height: 'calc(100vh - 4rem)' }}
        >
            <div className="relative w-full h-full overflow-hidden">
            </div>
            <motion.div className="flex flex-col flex-grow py-6 absolute inset-0">
                {menuItems.map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to={item.path}
                            className={`flex items-center transition-all duration-500 ease-in-out ${!isOpen ? 'justify-center h-14 relative group' : 'p-4 rounded-md'
                                } text-white hover:bg-gray-700`}
                        >
                            <motion.div
                                initial={false}
                                animate={{
                                    x: isOpen ? 0 : 'calc(50% - 12px)',
                                    marginRight: isOpen ? '12px' : '0px'
                                }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <item.icon className="h-6 w-6" />
                            </motion.div>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-medium whitespace-nowrap overflow-hidden"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {isOpen && item.hasSubmenu && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="ml-auto"
                                >
                                    <ChevronRightIcon className="h-5 w-5" />
                                </motion.div>
                            )}
                            {!isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap shadow-lg"
                                >
                                    {item.label}
                                    {item.hasSubmenu && <ChevronRightIcon className="h-4 w-4 inline-block ml-2" />}
                                </motion.div>
                            )}
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute bottom-4 p-3 bg-gradient-to-r border-2 border-violet-900 from-blue-900 to-indigo-900 mx-4 rounded-lg"
                >
                    <h3 className="font-bold text-center text-white text-lg">Chrome Extension</h3>
                    <p className="text-sm text-center text-gray-300 mt-1">
                        Download our Chrome Extension!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-3 px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 mx-auto"
                    >
                        <img src="assets/images/chrome-logo.png" alt="Chrome" className="w-5 h-5 mr-2" />
                        Install now
                    </motion.button>
                </motion.div>
            )}

            <AnimatePresence>
                {showArrow && (
                    <motion.button
                        initial={{ opacity: 0, x: isOpen ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isOpen ? 20 : -20 }}
                        transition={{ duration: 0.3 }}
                        onClick={toggleSidebar}
                        className="absolute -right-6 top-4 transform border-2 border-gray-700 -translate-y-1/2 bg-transparent rounded-full p-2 hover:bg-gray-800 hover:bg-opacity-30 transition-all duration-300 ease-in"
                    >
                        {isOpen ? (
                            <ChevronLeftIcon className="h-7 w-7 text-white transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
                        ) : (
                            <ChevronRightIcon className="h-7 w-7 text-white transition-transform duration-300 ease-in-out transform group-hover:-translate-x-1" />
                        )}
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.aside>
    );
};

export default Sidebar;
