// src/components/answer/SavedAnswerCard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClockIcon, DocumentTextIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const SavedAnswerCard = ({ item, onClick }) => {
	const [fileData, setFileData] = useState(null);

	useEffect(() => {
		if (item.file) {
			const savedFile = localStorage.getItem(`file_${item.id}`);
			if (savedFile) {
				setFileData(JSON.parse(savedFile));
			}
		}
	}, [item]);

	return (
		<motion.div
			className="bg-gray-800 p-3 rounded-md mb-3 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
			onClick={() => onClick(item)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex items-center mb-2">
				{fileData ? (
					fileData.type.startsWith("image/") ? (
						<img
							src={fileData.dataUrl}
							alt="Preview"
							className="h-8 w-8 object-cover rounded-sm mr-2"
						/>
					) : (
						<DocumentTextIcon className="h-4 w-4 text-purple-400 mr-2" />
					)
				) : item.file ? (
					<DocumentTextIcon className="h-4 w-4 text-purple-400 mr-2" />
				) : (
					<QuestionMarkCircleIcon className="h-4 w-4 text-purple-400 mr-2" />
				)}
				<p className="text-sm text-purple-200 truncate">{item.question}</p>
			</div>
			<div className="flex items-center text-xs text-gray-400">
				<ClockIcon className="h-3 w-3 mr-1" />
				<p>{new Date(item.timestamp).toLocaleString()}</p>
			</div>
		</motion.div>
	);
};

export default SavedAnswerCard;
