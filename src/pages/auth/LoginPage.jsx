// src/pages/auth/LoginPage.jsx
import React from 'react';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form>
                    <input
                        type="email"
                        placeholder="Email"
                        className="block w-full p-3 mb-4 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="block w-full p-3 mb-6 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 w-full text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
