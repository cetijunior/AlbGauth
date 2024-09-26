// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import ChatButton from './components/layout/ChatButton';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import FindTutorPage from './pages/tutoring/FindTutorPage';
import LearningPathPage from './pages/learning/LearningPathPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showInput, setShowInput] = useState(false);

  // Handle scroll to show/hide input in navbar
  useEffect(() => {
    const handleScroll = () => {
      const explanationSection = document.getElementById('question-input'); // Target AppExplanationSection
      if (explanationSection) {
        const explanationTop = explanationSection.getBoundingClientRect().top;
        setShowInput(explanationTop < 50); // Adjust threshold if necessary
      }
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
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden md:block"
        />
        <div
          className={`flex flex-col flex-grow ${isSidebarOpen ? 'ml-0 md:ml-48 lg:ml-48' : 'lg:ml-16 md:ml-0 ml-0'
            }`}
        >
          <Navbar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            showInput={showInput} // Pass the updated showInput state
          />
          <main className="bg-gray-50 flex-grow p-4 mt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tutors" element={<FindTutorPage />} />
              <Route path="/learning-paths" element={<LearningPathPage />} />
            </Routes>
          </main>
          <Footer />
          <ChatButton />
        </div>
      </div>
    </Router>
  );
}

export default App;
