// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRightOnRectangleIcon,
    Bars3Icon,
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

    return (
        <nav className="bg-white shadow-md p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
            {/* Logo on the left */}
            <div className="flex items-center">
                <Link
                    to="/"
                    onClick={handleHomeClick}
                    className="transition-all duration-500 ease-in-out transform"
                >
                    <img
                        src="/assets/images/fultzi-logo.jpg"
                        alt="The Albanian Gauth Logo"
                        className={`transition-all duration-500 ease-in-out h-16 w-16`}
                    />
                </Link>
            </div>

            {/* Question Input in the middle */}
            <div
                className="flex-grow flex justify-center">
                {showInput && (
                    <QuestionInput />
                )}
            </div>

            {/* Login button and menu on the right */}
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center"
                >
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                    <span className="ml-2">Login</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
