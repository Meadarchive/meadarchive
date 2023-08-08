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
import LoadingSpinner from "../../loading-spinner/LoadingSpinner";

export default function Create() {
	const { rid } = useParams();
	const auth = useAuth();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [errorMessages, setErrorMessages] = useState<
		{ path: string[]; message: string }[]
	>([]);
	const [recipeInfo, setRecipeInfo] = useState<RecipeInterface | null>();

	const [batchState, setBatchState] = useState<Batch>({
		author: "",
		recipeID: rid || "",
		stage: validStages[0],
		dateStarted: "",
		equipment: [{ item: "", quantity: 0 }],
		water: "",
		initialGravity: 1,
		batchName: "",
	});

	useEffect(() => {
		async function fetchRecipeInfo() {
			const recipeInfoRes = await getRecipeByRID(rid || "");
			setRecipeInfo(recipeInfoRes);
		}

		if (rid) {
			fetchRecipeInfo();
		}

		const currentDate = new Date();
		const timezoneOffset = currentDate.getTimezoneOffset() * 60; // Convert to seconds
		const unixTimestamp =
			Math.floor(currentDate.getTime() / 1000) - timezoneOffset;

		setBatchState((prevBatchState) => ({
			...prevBatchState,
			dateStarted: unixTimestamp.toString(),
		}));
	}, [rid]);

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
		const timezoneOffset = selectedDate.getTimezoneOffset() * 60;

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
			<div id="equipment-container" key={index}>
				<input
					type="text"
					value={item.item}
					onChange={(event) =>
						handleEquipmentChange(index, "item", event.target.value)
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
				<button
					type="button"
					onClick={() => handleRemoveEquipment(index)}
				>
					Remove
				</button>
			</div>
		));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const parsedBatchState: Batch = {
			...batchState,
			initialGravity: parseFloat(batchState.initialGravity.toString()),
			equipment: batchState.equipment.map((item) => ({
				...item,
				quantity: parseInt(item.quantity.toString()),
			})),
			author: auth.user?.uid || "",
		};
		async function handleCreateBatch() {
			if (!auth.user) {
				return;
			}
			try {
				const res = await createBatch(auth.user, parsedBatchState);
				if (res.error) {
					const messages = res.error.issues.map(
						(issue: { path: string[]; message: string }) => ({
							path: issue.path,
							message: issue.message,
						})
					);
					setErrorMessages(messages);
				} else {
					navigate(`/batch/${res.batchID}`);
				}
			} catch (error) {
				console.error("Error creating batch:", error);
			}
		}

		setLoading(true);
		await handleCreateBatch();
		setLoading(false);
	};

	const renderErrorMessages = () => {
		if (errorMessages.length === 0) {
			return null;
		}

		return (
			<div className="error-messages">
				{errorMessages.map((error, index) => (
					<div key={index} className="error-message">
						<span className="error-message error-field">
							{error.path.join(".")}
						</span>
						<span className="error-message error-text">
							{error.message}
						</span>
					</div>
				))}
			</div>
		);
	};

	return (
		<div id="create-batch-form-container">
			<h2>
				Creating Batch of{" "}
				<Link to={`/recipe/${rid}`}>{recipeInfo?.recipeName}</Link>
			</h2>
			<form id="create-batch-form">
				{renderErrorMessages()}
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
			{loading ? (
				<LoadingSpinner />
			) : (
				<button onClick={handleSubmit}>Save</button>
			)}
		</div>
	);
}
