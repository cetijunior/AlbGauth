// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    HomeIcon,
    UsersIcon,
    AcademicCapIcon,
    CogIcon,
} from '@heroicons/react/24/outline';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleHomeClick = (e) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav className="bg-white shadow-md p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center">
                <Link
                    to="/"
                    onClick={handleHomeClick}
                    className="transition-all duration-500 ease-in-out transform"
                >
                    <img
                        src="/assets/images/fultzi-logo.jpg"
                        alt="The Albanian Gauth Logo"
                        className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? 'sm:ml-14 ml-0 h-16 w-16' : 'h-16 w-16'}`}
                    />
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                {/* Hamburger Menu for small screens */}
                <button
                    className="block md:hidden text-gray-700 hover:text-blue-600 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>

                {/* Login button */}
                <Link
                    to="/login"
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-500 ease-in-out transform flex items-center`}
                >
                    <ArrowRightOnRectangleIcon className={`h-6 w-6 ${isSidebarOpen ? 'mr-2' : ''}`} />
                    <span className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                        {isSidebarOpen && 'Login'}
                    </span>
                </Link>
            </div>

            {/* Sidebar Icons inside Hamburger Menu */}
            <div
                className={`absolute top-24 left-0 right-0 bg-white shadow-lg p-4 md:hidden transition-all duration-500 ease-in-out transform ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
            >
                <ul className="flex flex-col space-y-4">
                    <li>
                        <Link
                            to="/"
                            onClick={(e) => {
                                handleHomeClick(e);
                                setMenuOpen(false);
                            }}
                            className="flex items-center text-gray-700 hover:text-blue-600 transition"
                        >
                            <HomeIcon className="h-6 w-6" />
                            <span className="ml-2">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center text-gray-700 hover:text-blue-600 transition"
                        >
                            <AcademicCapIcon className="h-6 w-6" />
                            <span className="ml-2">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/tutors"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center text-gray-700 hover:text-blue-600 transition"
                        >
                            <UsersIcon className="h-6 w-6" />
                            <span className="ml-2">Tutors</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center text-gray-700 hover:text-blue-600 transition"
                        >
                            <CogIcon className="h-6 w-6" />
                            <span className="ml-2">Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
