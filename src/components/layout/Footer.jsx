// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import BgUi from '../common/BgUI';

const Footer = () => {
    return (
        <footer className="relative flex flex-col border-t border-gray-900 min-h-[10rem] items-center justify-center text-gray-200 p-4 sm:p-6 overflow-hidden"
            style={{ background: 'black' }}
        >
            <div className="absolute inset-0">
                <BgUi />
            </div>
            <div className="container mx-auto text-center relative z-10">
                <p className="text-xs sm:text-sm">&copy; 2024 The Albanian Gauth. All rights reserved.</p>
                <div className="mt-2 flex flex-wrap justify-center">
                    <Link to="/terms" className="text-blue-400 hover:underline text-xs sm:text-sm mx-2 my-1">
                        Terms of Service
                    </Link>
                    <Link to="/privacy" className="text-blue-400 hover:underline text-xs sm:text-sm mx-2 my-1">
                        Privacy Policy
                    </Link>
                    <Link to="/contact" className="text-blue-400 hover:underline text-xs sm:text-sm mx-2 my-1">
                        Contact Us
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
