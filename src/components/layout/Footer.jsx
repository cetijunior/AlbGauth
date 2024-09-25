// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-6">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; 2024 The Albanian Gauth. All rights reserved.</p>
                <div className="mt-2 flex justify-center space-x-4">
                    <Link to="/terms" className="text-blue-400 hover:underline">
                        Terms of Service
                    </Link>
                    <Link to="/privacy" className="text-blue-400 hover:underline">
                        Privacy Policy
                    </Link>
                    <Link to="/contact" className="text-blue-400 hover:underline">
                        Contact Us
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
