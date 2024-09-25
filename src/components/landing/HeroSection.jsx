// src/components/landing/HeroSection.jsx
import React from 'react';
import { CalculatorIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import SubjectIcons from './SubjectIcons'; // Import the icons configuration
import UploadSection from '../common/UploadSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules'; // Correct import for Swiper Scrollbar
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/scrollbar'; // Import Scrollbar styles

const HeroSection = () => {
    return (
        <section className="flex flex-col sm:-mb-0 -mb-32 items-center justify-center min-h-screen bg-white text-gray-900 px-4 md:px-8 lg:px-12 py-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Ask Any Math Question</h1>

            {/* Input Field with Calculator and Enter Icon */}
            <div className="flex items-center w-full max-w-lg border border-gray-300 rounded shadow-sm mb-4 p-2">
                <input
                    type="text"
                    placeholder="Type your question..."
                    className="flex-grow p-2 focus:outline-none"
                />
                <div className="flex items-center">
                    <button className="text-gray-500 hover:text-gray-600">
                        <CalculatorIcon className="h-6 w-6" />
                    </button>
                    <div className="h-6 w-px bg-gray-300 mx-2"></div>
                    <button className="text-blue-500 hover:text-blue-600">
                        <ArrowRightIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* File Upload Section */}
            <UploadSection />

            {/* Subject Icons Section */}
            <div className="hidden sm:flex flex-wrap justify-center gap-4 mb-4">
                {SubjectIcons.map((subject, index) => (
                    <button key={index} className="flex flex-col items-center text-center">
                        <subject.icon className={`h-12 w-12 ${subject.color} mb-1`} />
                        <span>{subject.label}</span>
                    </button>
                ))}
            </div>

            {/* Swiper for small screens */}
            {/* Swiper for small screens */}
            <Swiper
                className="sm:hidden w-[300px]"
                spaceBetween={20} // Adjust space between slides
                slidesPerView={3}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }} // Enable draggable scrollbar
                modules={[Scrollbar]} // Add Scrollbar module to Swiper
                breakpoints={{
                    480: {
                        slidesPerView: 3,
                    },
                    640: {
                        slidesPerView: 4,
                    },
                }}
            >
                {SubjectIcons.map((subject, index) => (
                    <SwiperSlide key={index} className="flex mt-10 justify-center">
                        <button className="flex flex-col items-center justify-center text-center space-y-1"> {/* Use space-y-1 for consistent vertical spacing */}
                            <subject.icon className={`h-10 w-10 ${subject.color}`} />
                            <span className="mb-1 pb-4">{subject.label}</span> {/* Adjust mb-1 for consistent spacing */}
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
};

export default HeroSection;
