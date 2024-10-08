// src/components/landing/HeroSection.jsx
import React from 'react';
import AIAssistantSection from '../common/AIAssistantSection';
import ShootingStars from '../common/shootingStars';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    const handleSubmit = (question, file) => {
        navigate('/answer', { state: { question, file } });
    };

    return (
        <section
            id="hero-section"
            className="flex flex-col items-center justify-center min-h-screen text-gray-900 px-4 md:px-8 lg:px-12 space-y-4 py-6 relative overflow-hidden"
            style={{ background: '#000000' }}
        >
            <ShootingStars />
            <div className="ml-16 w-full flex flex-col justify-center items-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center text-white">
                    Your AI Homework <span className="text-[#cb6ce6]">Helper</span>
                </h1>
                <img className='w-1/6' src='assets/images/Logo.png' alt="logo" />

                <div className="flex w-full justify-center z-10">
                    <AIAssistantSection onSubmit={handleSubmit} />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;