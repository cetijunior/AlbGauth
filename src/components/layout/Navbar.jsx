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
import QuestionInput from '../common/QuestionInput';

const Navbar = ({ isSidebarOpen, toggleSidebar, showInput }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleHomeClick = (e) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Toggle the menu and manage input visibility
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-white shadow-md px-4 py-2 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
            {/* Logo on the left */}
            <div className={`flex items-center ${showInput ? 'hidden sm:flex' : 'flex'}`}>
                <Link to="/" onClick={handleHomeClick} className="transition-all duration-500 ease-in-out transform">
                    <img
                        src="/assets/images/fultzi-logo.jpg"
                        alt="The Albanian Gauth Logo"
                        className={`transition-all duration-500 ease-in-out h-12 w-12 sm:h-16 sm:w-16`}
                    />
                </Link>
            </div>

            {/* Question Input in the middle */}
            <div className="flex-grow flex justify-center h-12 mx-2">
                {showInput && <QuestionInput />}
            </div>

            {/* Login button and menu on the right */}
            <div className="flex items-center space-x-4">
                {/* Hamburger Menu for small screens */}
                <button
                    className="block sm:hidden text-gray-700 hover:text-blue-600 transition"
                    onClick={handleMenuToggle}
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>

                {/* Login button */}
                <Link
                    to="/login"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center"
                >
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                    <span className="ml-2 hidden sm:inline">Login</span>
                </Link>
            </div>

            {/* Sidebar Icons inside Hamburger Menu */}
            <div
                className={`absolute top-20 left-0 right-0 bg-white shadow-lg p-4 md:hidden transition-all duration-500 ease-in-out transform ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
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
