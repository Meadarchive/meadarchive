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
		batchID: bid,
		updateDate: Date.now().toString(),
		updateType: "text",
	});

	const handleUpdateTypeChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = e.target;
		setBatchUpdate((prevBatchUpdate) => ({
			...prevBatchUpdate,
			updateType: value as BatchUpdate["updateType"],
			text: "",
			newGravity: undefined,
			newStage: undefined,
		}));
	};

	const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setBatchUpdate((prevBatchUpdate) => ({
			...prevBatchUpdate,
			newStage: value as StageBatchUpdate["newStage"],
		}));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setBatchUpdate((prevBatchUpdate) => ({
			...prevBatchUpdate,
			[name]: value,
		}));
	};

	const handleUpdate = async () => {

		if (!auth.user || !batchUpdate.batchID) return;

		let parsedBatchUpdate: BatchUpdate;

		if (batchUpdate.updateType === "gravity") {
			parsedBatchUpdate = {
				updateType: batchUpdate.updateType,
				newGravity: Number(batchUpdate.newGravity || 0),
				batchID: batchUpdate.batchID,
				updateDate: batchUpdate.updateDate,
			};
		} else if (batchUpdate.updateType === "stage") {
			parsedBatchUpdate = {
				updateType: batchUpdate.updateType,
				updateDate: batchUpdate.updateDate,
				batchID: batchUpdate.batchID,
				newStage: batchUpdate.newStage,
			};
		} else {
			parsedBatchUpdate = {
				updateType: batchUpdate.updateType,
				updateDate: batchUpdate.updateDate,
				text: batchUpdate.text,
				batchID: batchUpdate.batchID,
			};
		}

		await createBatchUpdate(auth.user, parsedBatchUpdate);
		navigate(`/batch/${batchUpdate.batchID}`);
	};

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
