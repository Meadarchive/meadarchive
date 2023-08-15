import React, { useEffect, useState, ChangeEvent } from "react";
import "./styles/calculator.css";

const Calculator: React.FC = () => {
	const [originalGravity, setOriginalGravity] = useState<string>("1.0");
	const [finalGravity, setFinalGravity] = useState<string>("1.0");
	const [error, setError] = useState<string>("");
	const [calculatedABV, setCalculatedABV] = useState<number | undefined>(
		undefined
	);

	const isValidGravity = (gravity: number): boolean => {
		return gravity >= 0.9 && gravity <= 2;
	};

	const calculateABV = (og: number, fg: number): void => {
		if (isValidGravity(og) && isValidGravity(fg)) {
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
		const ogValue = parseFloat(originalGravity);
		const fgValue = parseFloat(finalGravity);

		if (!isNaN(ogValue) && !isNaN(fgValue)) {
			calculateABV(ogValue, fgValue);
		}
	}, [originalGravity, finalGravity]);

	const handleGravityChange = (
		e: ChangeEvent<HTMLInputElement>,
		setter: React.Dispatch<React.SetStateAction<string>>
	) => {
		const value = e.target.value;

		// Validate the input value to ensure it's a valid float
		if (/^\d+(\.\d*)?$/.test(value) || value === "") {
			setter(value);
		}
	};

	return (
		<div id="calculator-container">
			<div id="calculator-subcontainer">
				<div id="calculator-title">ABV from hydrometer</div>
				<div id="calculator">
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
					<div className="gravity-container">
						<label
							htmlFor="original-gravity-input"
							className="gravity-label"
						>
							Original Gravity:
						</label>
						<input
							id="original-gravity-input"
							className="gravity-input"
							type="text"
							value={originalGravity}
							onChange={(e) =>
								handleGravityChange(e, setOriginalGravity)
							}
						/>
					</div>
					<div className="gravity-container">
						<label
							htmlFor="final-gravity-input"
							className="gravity-label"
						>
							Final Gravity:
						</label>
						<input
							id="final-gravity-input"
							className="gravity-input"
							type="text"
							value={finalGravity}
							onChange={(e) =>
								handleGravityChange(e, setFinalGravity)
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calculator;
