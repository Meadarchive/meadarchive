import "./styles/spinner.css";
import React from "react";

const LoadingSpinner: React.FC = () => {
	return (
		<div className="loading-spinner-container">
			<div className="loading-spinner"></div>
		</div>
	);
};

export default LoadingSpinner;
