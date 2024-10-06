// src/components/landing/FAQSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShootingStars from '../common/shootingStars';

// Dummy Data for FAQs
const faqs = [
    {
        question: "How does the AI work?",
        answer:
            "Our AI uses advanced machine learning algorithms and natural language processing to understand and solve complex problems. It analyzes the question, breaks it down into components, and provides step-by-step explanations using its vast knowledge base.",
    },
    {
        question: "Can I get help from real tutors?",
        answer:
            "Absolutely! We have a network of qualified tutors available 24/7 for personalized assistance. You can schedule one-on-one sessions or join group tutoring sessions based on your preference and learning needs.",
    },
    {
        question: "What subjects are covered?",
        answer:
            "We cover a wide range of subjects including Mathematics, Physics, Chemistry, Biology, Computer Science, Literature, History, and more. Our platform is constantly expanding to include new subjects and topics.",
    },
    {
        question: "Is there a mobile app available?",
        answer:
            "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play Store to access our services on the go.",
    },
    {
        question: "How much does it cost?",
        answer:
            "We offer various subscription plans to suit different needs and budgets. You can choose from monthly, quarterly, or annual plans. We also offer a free trial period for new users to explore our platform.",
    },
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % faqs.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleQuestionClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section className="py-16 px-4 md:px-8 relative bg-gradient-to-b bg-black">
            <ShootingStars />
            <div className="max-w-xl sm:max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
                >
                    Frequently Asked Questions
                </motion.h2>

                {/* For small screens */}
                <div className="md:hidden space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-md overflow-hidden"
                        >
                            <button
                                className="flex justify-between items-center w-full p-4 text-left text-white"
                                onClick={() => handleQuestionClick(index)}
                            >
                                <h3 className="text-lg font-semibold">{faq.question}</h3>
                                <span className="text-2xl">{index === activeIndex ? '−' : '+'}</span>
                            </button>
                            <AnimatePresence>
                                {index === activeIndex && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-4 pb-4"
                                    >
                                        <p className="text-gray-300">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* For medium and larger screens */}
                <div className="hidden md:flex md:flex-row ml-20 items-center justify-center mt-8 space-x-8">
                    {/* Left Side: Questions List */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-1/2 space-y-4"
                    >
                        {faqs.map((faq, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-4 text-left rounded-lg transition duration-300 w-full ${activeIndex === index
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-white bg-opacity-10 text-gray-200 hover:bg-blue-500 hover:bg-opacity-20'
                                    }`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <h3 className="text-lg font-semibold">{faq.question}</h3>
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Right Side: Answers Display */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-1/2 relative h-80"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg overflow-y-auto z-20"
                            >
                                <h3 className="text-2xl font-bold text-blue-400 mb-4">{faqs[activeIndex]?.question}</h3>
                                <p className="text-gray-200 text-lg leading-relaxed">
                                    {faqs[activeIndex]?.answer.split('\n').map((paragraph, index) => (
                                        <React.Fragment key={index}>
                                            {paragraph}
                                            <br /><br />
                                        </React.Fragment>
                                    ))}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
