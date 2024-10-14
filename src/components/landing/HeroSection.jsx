// src/components/landing/HeroSection.jsx
import AIAssistantSection from "./AIAssistantSection";
import ShootingStars from "../common/shootingStars";
import { useNavigate } from "react-router-dom";
import UploadSection from "./UploadSection";
import QuestionInput from "../common/QuestionInput"
import { motion } from "framer-motion"

const HeroSection = () => {
	const navigate = useNavigate();

	const handleSubmit = (question, file) => {
		navigate("/answer", { state: { question, file } });
	};

	return (
		<section
			id="hero-section"
			className="flex flex-col items-center -mt-10 justify-center min-h-screen text-gray-900 px-4 md:px-8 lg:px-12 space-y-4 py-6 relative overflow-hidden"
			style={{ background: "#000000" }}
		>
			<ShootingStars />
			<div className="ml-16 w-full flex flex-col justify-center items-center">
				<h1 className="text-4xl md:text-5xl font-bold mb-2 text-center text-white">
					Your AI Homework <span className="text-[#cb6ce6]">Helper</span>
				</h1>
				<img className="w-auto h-auto" src="assets/images/Logo.png" alt="logo" />
				<motion.div
					className="flex flex-col mt-6 items-center w-[1100px] justify-center z-10"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<QuestionInput inputId="questionInput" />
					<UploadSection onSubmit={handleSubmit} />
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
