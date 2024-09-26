// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    HomeIcon,
    UsersIcon,
    AcademicCapIcon,
    CogIcon,
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <aside
            className={`bg-white z-50 text-gray-800 h-full fixed top-24 left-0 shadow-md flex flex-col justify-between transition-all duration-500 px-10 ease-in-out transform ${isOpen ? 'w-48' : 'w-20'
                } hidden md:flex`}
        >
            {/* Toggle Button at the Top */}
            <div className="flex items-center justify-center p-2">
                <button
                    className="text-gray-800 hover:text-gray-600 focus:outline-none"
                    onClick={toggleSidebar}
                >
                    {isOpen ? (
                        <ChevronLeftIcon className="h-6 w-6" />
                    ) : (
                        <ChevronRightIcon className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Navigation Icons Centered */}
            <div className="flex flex-col items-center justify-center flex-grow space-y-4">
                <Link
                    to="/"
                    className="block text-gray-800 hover:bg-gray-200 p-2 rounded flex flex-col items-center justify-center"
                >
                    <HomeIcon className="h-6 w-6" />
                    {isOpen ? (
                        <span className="ml-2">Home</span>
                    ) : (
                        <span className="text-xs mt-1">Home</span>
                    )}
                </Link>
                <Link
                    to="/dashboard"
                    className="block text-gray-800 hover:bg-gray-200 p-2 rounded flex flex-col items-center justify-center"
                >
                    <AcademicCapIcon className="h-6 w-6" />
                    {isOpen ? (
                        <span className="ml-2">Dashboard</span>
                    ) : (
                        <span className="text-xs mt-1">Dashboard</span>
                    )}
                </Link>
                <Link
                    to="/tutors"
                    className="block text-gray-800 hover:bg-gray-200 p-2 rounded flex flex-col items-center justify-center"
                >
                    <UsersIcon className="h-6 w-6" />
                    {isOpen ? (
                        <span className="ml-2">Tutors</span>
                    ) : (
                        <span className="text-xs mt-1">Tutors</span>
                    )}
                </Link>
            </div>

            {/* Settings Icon at the Bottom */}
            <div className="flex flex-col items-center mb-28 justify-center">
                <CogIcon className="h-6 w-6 mb-1 text-gray-600" />
                {isOpen ? (
                    <span className="text-sm">Settings</span>
                ) : (
                    <span className="text-xs mb-1">Settings</span>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
