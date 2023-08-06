import React, { useEffect, useState } from "react";
import "./styles/calculator.css";

const Calculator: React.FC = () => {
	const [originalGravity, setOriginalGravity] = useState<number>(1.0);
	const [finalGravity, setFinalGravity] = useState<number>(1.0);
	const [error, setError] = useState<string>("");
	const [calculatedABV, setCalculatedABV] = useState<number | undefined>(
		undefined
	);

	const calculateABV = (og: number, fg: number): void => {
		if (og >= 0.9 && og <= 2 && fg >= 0.9 && fg <= 2) {
			setCalculatedABV((og - fg) * 131.25);
			setError("");
		} else if (og < fg) {
			setError("Final gravity must be less than original gravity");
			setCalculatedABV(undefined);
		} else {
			setError("Gravity must be between 0.9 and 2");
			setCalculatedABV(undefined);
		}
	};

    useEffect(() => {
        calculateABV(originalGravity, finalGravity);
    },[])

	const handleOriginalGravityChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = parseFloat(e.target.value);
		setOriginalGravity(value);
		calculateABV(value, finalGravity); // Call calculateABV when originalGravity changes
	};

	const handleFinalGravityChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = parseFloat(e.target.value);
		setFinalGravity(value);
		calculateABV(originalGravity, value); // Call calculateABV when finalGravity changes
	};

	return (
		<div id="calculator-container">
			<div id="calculator-subcontainer">
				<div id="calculator-title">ABV from hydrometer</div>
				<div id="calculator">
					<div id="og" className="gravity-container">
						<label className="gravity-label">
							Original Gravity:
						</label>
						<input
							className="gravity-input"
							type="number"
							step="0.01"
							value={originalGravity}
							onChange={handleOriginalGravityChange}
						/>
					</div>
					<div className="gravity-container">
						<label className="gravity-label">Final Gravity:</label>
						<input
							className="gravity-input"
							type="number"
							step="0.01"
							value={finalGravity}
							onChange={handleFinalGravityChange}
						/>
					</div>
					<div id="subtext">
						{calculatedABV !== undefined ? (
							<p>
								The ABV of your brew is{" "}
								{calculatedABV.toFixed(2)}%
							</p>
						) : (
							<p>{error}</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calculator;
