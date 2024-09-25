// src/components/landing/TestimonialsSection.jsx
import React from 'react';

const TestimonialsSection = () => {
    return (
        <section className="p-6 bg-gray-50">
            <h2 className="text-4xl font-bold text-center mb-6">What Our Users Say</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="p-4 bg-white rounded shadow">
                    <p className="italic text-gray-700">"This app saved me countless times! The step-by-step guidance is amazing."</p>
                    <h4 className="mt-2 font-semibold">- Student A</h4>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="italic text-gray-700">"The best tutoring service with instant answers. Highly recommended!"</p>
                    <h4 className="mt-2 font-semibold">- Student B</h4>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
