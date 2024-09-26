// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import ChatButton from "./components/layout/ChatButton"; // Import the Chat Button component
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import FindTutorPage from "./pages/tutoring/FindTutorPage";
import LearningPathPage from "./pages/learning/LearningPathPage";
import "./App.css";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden md:block"
        />
        <div
          className={`flex flex-col flex-grow ${
            isSidebarOpen ? "ml-0 md:ml-52 lg:ml-52" : "sm:ml-20 ml-0"
          }`}
        >
          <Navbar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <main className="bg-gray-50 flex-grow p-4 mt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tutors" element={<FindTutorPage />} />
              <Route path="/learning-paths" element={<LearningPathPage />} />
            </Routes>
          </main>
          <Footer />
          <ChatButton /> {/* Include the ChatButton component */}
        </div>
      </div>
    </Router>
  );
}

export default App;
