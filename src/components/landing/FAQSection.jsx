// src/components/landing/FAQSection.jsx
import React from 'react';

const FAQSection = () => {
    return (
        <section className="p-6 bg-white">
            <h2 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="grid gap-4">
                <div className="p-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-semibold">How does the AI work?</h3>
                    <p className="text-gray-600">Our AI uses advanced algorithms to solve complex problems and provide step-by-step explanations.</p>
                </div>
                <div className="p-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-semibold">Can I get help from real tutors?</h3>
                    <p className="text-gray-600">Yes, we have a network of tutors available 24/7 for personalized assistance.</p>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
