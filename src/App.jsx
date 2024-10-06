// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import ChatButton from './components/layout/ChatButton';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import FindTutorPage from './pages/tutoring/FindTutorPage';
import LearningPathPage from './pages/learning/LearningPathPage';
import CalculatorPage from './pages/calculator/CalculatorPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNavbarInput, setShowNavbarInput] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar input when user scrolls past a certain point
      setShowNavbarInput(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          className="hidden md:block"
        />
        <div
          className={`flex flex-col flex-grow transition-all duration-500 ease-in-out
            ${isSidebarOpen ? 'md:ml-52 lg:ml-52' : 'ml-0'}
          `}
        >
          <Navbar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            showInput={showNavbarInput}
          />
          <main className={`bg-gray-50 flex-grow p-0 mt-16 transition-all duration-500 ease-in-out`}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tutors" element={<FindTutorPage />} />
              <Route path="/learning-paths" element={<LearningPathPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
            </Routes>
          </main>
          <Footer />
          <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
            <ChatButton />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;