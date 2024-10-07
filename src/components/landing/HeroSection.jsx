// src/components/landing/HeroSection.jsx
import React, { useState } from 'react';
import QuestionInput from '../common/QuestionInput';
import UploadSection from '../common/UploadSection';
import ShootingStars from '../common/shootingStars';

const HeroSection = () => {
    const [cohereAnswer, setCohereAnswer] = useState('');

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
                    <QuestionInput inputId="question-input" setCohereAnswer={setCohereAnswer} />
                </div>

                {!cohereAnswer && (
                    <div className="flex justify-center w-full mt-8 z-10">
                        <UploadSection />
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;