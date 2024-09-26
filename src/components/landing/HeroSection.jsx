// src/components/landing/HeroSection.jsx
import React from 'react';
import QuestionInput from '../common/QuestionInput';
import SubjectIcons from './SubjectIcons';
import UploadSection from '../common/UploadSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

const HeroSection = () => {
    return (
        <section
            id="hero-section"
            className="flex flex-col sm:-mb-0 -mb-32 items-center justify-center ml-0 min-h-screen text-gray-900 px-4 md:px-8 lg:px-12 space-y-4 py-6"
        >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Ask Any Math Question
            </h1>

            {/* Pass the unique ID to the QuestionInput */}
            <QuestionInput inputId="question-input" />

            {/* File Upload Section */}
            <UploadSection />

            {/* Subject Icons Section */}
            <div className="hidden sm:flex max-w-xl sm:max-w-full flex-wrap justify-center gap-4 mb-4">
                {SubjectIcons.map((subject, index) => (
                    <button key={index} className="flex flex-col items-center text-center">
                        <subject.icon className={`h-12 w-12 ${subject.color} mb-1`} />
                        <span>{subject.label}</span>
                    </button>
                ))}
            </div>

            {/* Swiper for small screens */}
            <Swiper
                className="sm:hidden w-[300px]"
                spaceBetween={20}
                slidesPerView={3}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                modules={[Scrollbar]}
                breakpoints={{
                    480: { slidesPerView: 3 },
                    640: { slidesPerView: 4 },
                }}
            >
                {SubjectIcons.map((subject, index) => (
                    <SwiperSlide key={index} className="flex mt-10 justify-center">
                        <button className="flex flex-col items-center justify-center text-center space-y-1">
                            <subject.icon className={`h-10 w-10 ${subject.color}`} />
                            <span className="mb-1 pb-4">{subject.label}</span>
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroSection;
