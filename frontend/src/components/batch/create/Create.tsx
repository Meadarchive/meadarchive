import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import createBatch from "../../../api/create/createBatch";
import {
	Batch,
	validStages,
	Equipment,
} from "../../../api/interfaces/batchInterface";
import { useAuth } from "../../../hooks/useAuth";
import "./styles/create.css";
import RecipeInterface from "../../recipe/view/interfaces/RecipeInterface";
import getRecipeByRID from "../../../api/get/getRecipeByRID";

export default function Create() {
	// get recipe id from url
	let params = useParams();
	let rid: string = params.rid || "";
	const auth = useAuth();

	const navigate = useNavigate();

	const [userID, setUserID] = useState<string>("");
	const [recipeInfo, setRecipeInfo] = useState<RecipeInterface | null>();

	const [errors, setErrors] = useState({
		batchName: "",
		water: "",
		initialGravity: "",
		dateStarted: "",
	});

	useEffect(() => {
		const fetchRecipeInfo = async () => {
			const recipeInfoRes = await getRecipeByRID(rid);
			setRecipeInfo(recipeInfoRes);
		};

		rid && fetchRecipeInfo();

		const currentDate = new Date();
		const timezoneOffset = currentDate.getTimezoneOffset() * 60; // Convert to seconds
		const unixTimestamp =
			Math.floor(currentDate.getTime() / 1000) - timezoneOffset;

		setBatchState((prevBatchState) => ({
			...prevBatchState,
			dateStarted: unixTimestamp.toString(),
		}));
	}, [rid]);

	useEffect(() => {
		console.log(auth.user?.uid);
		auth.isLoading === false &&
			auth.user !== null &&
			setUserID(auth.user.uid);
	}, [auth]);

	const [batchState, setBatchState] = useState<Batch>({
		author: userID,
		recipeID: rid,
		stage: validStages[0],
		dateStarted: Math.floor(Date.now() / 1000).toString(),
		equipment: [{ item: "", quantity: 0 }],
		water: "",
		initialGravity: 1,
		batchName: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setBatchState((prevBatchState) => ({
			...prevBatchState,
			[name]: value,
		}));
	};

	const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setBatchState((prevBatchState) => ({
			...prevBatchState,
			stage: value as (typeof validStages)[number],
		}));
	};

	const handleDateStartedChange = (date: string) => {
		const newDateStarted = date === "0" ? "" : date;
		const selectedDate = new Date(newDateStarted);
		const timezoneOffset = selectedDate.getTimezoneOffset() * 60; // Convert to seconds

		console.log(timezoneOffset);

		// Subtract the timezone offset from the Unix timestamp to get the correct time
		const unixTimestamp =
			Math.floor(selectedDate.getTime() / 1000) - timezoneOffset;

		setBatchState((prevBatchState) => ({
			...prevBatchState,
			dateStarted: unixTimestamp.toString(),
		}));
	};

	const handleEquipmentChange = (
		index: number,
		field: keyof Equipment,
		value: string
	) => {
		const updatedEquipment = [...batchState.equipment];
		updatedEquipment[index] = {
			...updatedEquipment[index],
			[field]: value,
		};

		setBatchState({
			...batchState,
			equipment: updatedEquipment,
		});
	};

	const handleRemoveEquipment = (index: number) => {
		const updatedEquipment = [...batchState.equipment];
		updatedEquipment.splice(index, 1);

		setBatchState({
			...batchState,
			equipment: updatedEquipment,
		});
	};

	const renderEquipmentInputs = () => {
		return batchState.equipment.map((item, index) => (
			<>
				<div id="equipment-container" key={index}>
					<input
						type="text"
						value={item.item}
						onChange={(event) =>
							handleEquipmentChange(
								index,
								"item",
								event.target.value
							)
						}
						placeholder="Equipment Item"
					/>
					<input
						type="number"
						value={item.quantity}
						onChange={(event) =>
							handleEquipmentChange(
								index,
								"quantity",
								event.target.value
							)
						}
						placeholder="Quantity"
					/>
				</div>
				<button
					type="button"
					onClick={() => handleRemoveEquipment(index)}
				>
					Remove
				</button>
			</>
		));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Submitting form...");
		// Clear existing validation errors
		setErrors({
			batchName: "",
			water: "",
			initialGravity: "",
			dateStarted: "",
		});

		// Check if the required fields are empty
		if (!batchState.batchName) {
			setErrors((prevErrors) => ({
				...prevErrors,
				batchName: "Batch Name is required.",
			}));
		}
		if (!batchState.water) {
			setErrors((prevErrors) => ({
				...prevErrors,
				water: "Water is required.",
			}));
		}
		if (!batchState.initialGravity) {
			setErrors((prevErrors) => ({
				...prevErrors,
				initialGravity: "Initial Gravity is required.",
			}));
		}
		if (!batchState.dateStarted) {
			setErrors((prevErrors) => ({
				...prevErrors,
				dateStarted: "Date Started is required.",
			}));
		}

		// Perform additional validation for specific fields (if needed)
		if (batchState.initialGravity <= 0) {
			setErrors((prevErrors) => ({
				...prevErrors,
				initialGravity: "Initial Gravity must be a positive number.",
			}));
		}

		// Check if any errors exist
		if (
			!batchState.batchName ||
			!batchState.water ||
			!batchState.initialGravity ||
			!batchState.dateStarted ||
			batchState.initialGravity <= 0
		) {
			return;
		}

		if (!auth.user) return;
		const parsedBatchState = {
			...batchState,
			initialGravity: parseFloat(batchState.initialGravity.toString()),
			equipment: batchState.equipment.map((item) => ({
				...item,
				quantity: parseInt(item.quantity.toString()),
			})),
			author: auth.user.uid,
		};
		let res = await createBatch(auth.user, parsedBatchState);
		console.log(res);
		console.log("Form submitted with state:", parsedBatchState);
		navigate(`/batch/${res.batchID}`);
	};

	return (
		<div id="create-batch-form-container">
			<h2>
				Creating Batch of{" "}
				<Link to={`/recipe/${rid}`}>{recipeInfo?.recipeName}</Link>
			</h2>
			<form id="create-batch-form">
				<div>
					<label className="bold-and-bigger-and-bigger">
						Batch Name:
					</label>
					<input
						type="text"
						name="batchName"
						value={batchState.batchName}
						onChange={handleChange}
						required
					/>
				</div>
				{errors.batchName && (
					<span className="error-message">{errors.batchName}</span>
				)}
				<div>
					<label className="bold-and-bigger">Water:</label>
					<input
						type="text"
						name="water"
						value={batchState.water}
						onChange={handleChange}
						required
					/>
				</div>
				{errors.water && (
					<span className="error-message">{errors.water}</span>
				)}
				<div>
					<label className="bold-and-bigger">Initial Gravity:</label>
					<input
						type="number"
						name="initialGravity"
						value={batchState.initialGravity}
						onChange={handleChange}
						required
					/>
				</div>
				{errors.initialGravity && (
					<span className="error-message">
						{errors.initialGravity}
					</span>
				)}
				<div>
					<label className="bold-and-bigger">
						Date Started:&nbsp;
					</label>
					<div className="datetime-wrapper">
						<input
							type="datetime-local"
							name="dateStarted"
							value={
								batchState.dateStarted
									? new Date(
											parseInt(batchState.dateStarted) *
												1000
									  )
											.toISOString()
											.slice(0, -1)
									: ""
							}
							onChange={(event) =>
								handleDateStartedChange(event.target.value)
							}
							required
						></input>
						<span className="custom-icon">📅</span>
					</div>
				</div>
				{errors.dateStarted && (
					<span className="error-message">{errors.dateStarted}</span>
				)}
				<div>
					<div className="bold-and-bigger">Equipment</div>
					{renderEquipmentInputs()}
					<button
						type="button"
						onClick={() =>
							setBatchState({
								...batchState,
								equipment: [
									...batchState.equipment,
									{ item: "", quantity: 0 },
								],
							})
						}
					>
						Add Equipment
					</button>
				</div>
				<div id="create-batch-stage-container">
					<label className="bold-and-bigger">Stage:&nbsp;</label>
					<select
						name="stage"
						value={batchState.stage}
						onChange={handleStageChange}
						required
					>
						{validStages.map((stage) => (
							<option key={stage} value={stage}>
								{stage}
							</option>
						))}
					</select>
				</div>
			</form>
			<button onClick={handleSubmit}>Save</button>
		</div>
	);
}
