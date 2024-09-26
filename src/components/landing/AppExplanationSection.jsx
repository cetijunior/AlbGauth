// src/components/landing/AppExplanationSection.jsx
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/css'; // Import Swiper styles

// Dummy images - Replace these with your actual images
const baseImage = '/assets/images/step-by-step.png'; // Base phone-like canvas image
const stepImages = ['/assets/images/step1.png', '/assets/images/step2.png']; // Ensure this is correctly defined
const explanationImage = '/assets/images/explanation.png'; // Image for Detailed Explanations
const fastSolutionImage = '/assets/images/fast-solution.png'; // Image for Fast Solutions

// Feature data
const features = [
    {
        title: 'Step-by-step',
        description: 'Clear solving steps guiding you to every solution',
        type: 'step', // Feature type to handle different behaviors
    },
    {
        title: 'Detailed explanations',
        description: 'Connect the logic behind each step with "how" and "why" tips',
        type: 'explanation', // Feature type for explanation
    },
    {
        title: 'Fast solutions',
        description: 'Our AI returns solutions in seconds',
        type: 'fast', // Feature type for fast solutions with loader
    },
];

const AppExplanationSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showLoader, setShowLoader] = useState(false); // State to control the ghost loader

    // Autoplay feature sections
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    // Handle feature click
    const handleFeatureClick = (index) => {
        setActiveIndex(index);
        if (features[index].type === 'fast') {
            setShowLoader(true); // Show loader initially
            setTimeout(() => {
                setShowLoader(false); // Hide loader after 1.5 seconds
            }, 1500);
        }
    };

    return (
        <section
            id="app-explanation-section" // Add this ID
            className="flex flex-col sm:flex-row items-center justify-evenly mt-26 relative">
            {/* Wrapper for phone-like canvas and images */}
            <div className=" w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
                <div className="relative sm:ml-64 ml-0 w-[260px] md:w-[300px] h-[500px] md:h-[600px] bg-white rounded-[40px] shadow-lg overflow-visible border-[14px] border-gray-800 z-10">
                    <div className="absolute z-20 top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[30px] bg-gray-800 rounded-b-[20px]"></div>
                    <div className="absolute z-20 bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-[5px] bg-gray-800 rounded-full"></div>
                    {/* Base Image displayed full size */}
                    <img
                        src={baseImage}
                        alt="Phone Canvas"
                        className="absolute inset-0 rounded-t-full w-full h-full object-top z-10"
                    />

                    {features[activeIndex].type === 'step' && (
                        <>
                            <img
                                src={stepImages[0]}
                                alt="Step 1"
                                className="hidden md:block absolute top-20 -left-20 object-cover z-30"
                                style={{
                                    transform: 'translate(0%, 0%)',
                                    opacity: 1,
                                }}
                            />
                            <img
                                src={stepImages[1]}
                                alt="Step 2"
                                className="hidden md:block absolute bottom-20 -right-24 object-top z-30"
                                style={{
                                    transform: 'translate(0%, 0%)',
                                    opacity: 1,
                                }}
                            />
                        </>
                    )}

                    {/* Detailed Explanations Image */}
                    {features[activeIndex].type === 'explanation' && (
                        <img
                            src={explanationImage}
                            alt="Detailed Explanation"
                            className="hidden md:block absolute top-[70%] left-24 object-cover z-30"
                            style={{
                                transform: 'translate(0%, -70%)',
                                opacity: 1,
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Swiper for sm screens */}
            <div className={`w-[300px] flex flex-col my-4 ${activeIndex === 2 ? 'h-0' : 'h-[320px]'}`}>
                {activeIndex === 0 && (
                    <Swiper className="block md:hidden w-full" spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center space-y-2">
                                <img src={stepImages[0]} alt="Step 1" className="w-auto h-auto object-contain" />
                                <img src={stepImages[1]} alt="Step 2" className="w-auto h-auto object-contain" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                )}

                {activeIndex === 1 && (
                    <Swiper className="block md:hidden w-full" spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                        <SwiperSlide>
                            <img src={explanationImage} alt="Detailed Explanation" className="w-auto h-auto object-contain" />
                        </SwiperSlide>
                    </Swiper>
                )}

                {activeIndex === 2 && (
                    <Swiper className="block md:hidden" spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                        <SwiperSlide>
                            <img src={fastSolutionImage} alt="Fast Solution" className="w-auto h-auto object-contain" />
                        </SwiperSlide>
                    </Swiper>
                )}
            </div>

            {/* Feature sections on the right */}
            <div className="w-auto sm:mr-32 mr-0 md:w-1/2 lg:w-2/5 flex flex-col space-y-4">
                {features.map((feature, index) => (
                    <button
                        key={index}
                        className={`p-4 text-left border rounded-xl transition duration-300 ${activeIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-100'
                            }`}
                        onClick={() => handleFeatureClick(index)}
                    >
                        <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
                        <p className="mt-2 text-sm md:text-base">{feature.description}</p>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default AppExplanationSection;
