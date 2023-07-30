import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import createBatchUpdate from "../../../api/create/createBatchUpdate";
import {
	StageBatchUpdate,
	BatchUpdate,
	validStages,
} from "../../../api/interfaces/batchInterface";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
    const params = useParams<{ bid?: string }>();
	const bid = params.bid || "";
	const auth = useAuth();
    const navigate = useNavigate();
	const [batchUpdate, setBatchUpdate] = useState<BatchUpdate>({
		batchID: bid, // Fill in the batchID here
		updateDate: Date.now().toString(),
		updateType: "text", // Default to text, can be changed based on user selection
	});

	const handleUpdateTypeChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = e.target;
		setBatchUpdate((prevBatchUpdate: BatchUpdate) => ({
			...prevBatchUpdate,
			updateType: value as BatchUpdate["updateType"],
			text: "", // Reset text field when updateType changes
			newGravity: undefined, // Reset newGravity field when updateType changes
			newStage: undefined, // Reset newStage field when updateType changes
		}));
	};

    const handleStageChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = e.target;
		setBatchUpdate((prevBatchUpdate: BatchUpdate) => ({
			...prevBatchUpdate,
			newStage: value as StageBatchUpdate["newStage"],
		}));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setBatchUpdate((prevBatchUpdate: BatchUpdate) => ({
			...prevBatchUpdate,
			[name]: value,
		}));
	};

	const handleUpdate = async () => {
		console.log("Updating batch...");
		if (!auth.user || !batchUpdate.batchID) return;

        let parsedBatchUpdate = batchUpdate;

        // if batch updatea is gravity update, convert newGravity to number
        if (batchUpdate.updateType === "gravity") {
            parsedBatchUpdate = {
                updateType: batchUpdate.updateType,
                newGravity: Number(batchUpdate.newGravity || 0),
				batchID: batchUpdate.batchID,
				updateDate: batchUpdate.updateDate,
            };
        }

		if (batchUpdate.updateType === "stage") {
			parsedBatchUpdate = {
				updateType: batchUpdate.updateType,
				updateDate: batchUpdate.updateDate,
				batchID: batchUpdate.batchID,
				newStage: batchUpdate.newStage,
			};
		}

		if (batchUpdate.updateType === "text") {
			parsedBatchUpdate = {
				updateType: batchUpdate.updateType,
				updateDate: batchUpdate.updateDate,
				text: batchUpdate.text,
				batchID: batchUpdate.batchID,
			};
		}

		// Use your API function to update the batch
		let res = await createBatchUpdate(
			auth.user,
			parsedBatchUpdate
		);
		console.log(res);
		console.log("Batch updated with state:", batchUpdate);
		navigate(`/batch/${batchUpdate.batchID}`); // Uncomment this if you have navigation to the batch page
	};

	// Function to render form fields based on updateType
	const renderFormFields = () => {
		switch (batchUpdate.updateType) {
			case "text":
				return (
					<div>
						<label>Text Update:</label>
						<input
							type="text"
							name="text"
							value={batchUpdate.text}
							onChange={handleChange}
						/>
					</div>
				);
			case "gravity":
				return (
					<div>
						<label>New Gravity:</label>
						<input
							type="number"
							name="newGravity"
							value={batchUpdate.newGravity || ""}
							onChange={handleChange}
						/>
					</div>
				);
			case "stage":
				return (
					<div>
						<br />
						<label>New Stage:&nbsp;</label>
						<select
							name="newStage"
							value={batchUpdate.newStage || ""}
							onChange={handleStageChange}
						>
							{validStages.map((stage) => (
								<option key={stage} value={stage}>
									{stage}
								</option>
							))}
						</select>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div id="update-batch-form-container">
			<h2>Update Batch</h2>
			<form id="update-batch-form">
				<div>
					<label>Update Type:&nbsp;</label>
					<select
						name="updateType"
						value={batchUpdate.updateType}
						onChange={handleUpdateTypeChange}
					>
						<option value="text">Text Update</option>
						<option value="gravity">Gravity Update</option>
						<option value="stage">Stage Update</option>
					</select>
				</div>
				{renderFormFields()}
			</form>
			<button onClick={handleUpdate}>Update</button>
		</div>
	);
}
