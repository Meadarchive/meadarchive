import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import createBatch from "../../../api/create/createBatch";
import {
	Batch,
	validStages,
	Equipment,
} from "../../../api/create/interfaces/createBatchInterface";
import { useAuth } from "../../../hooks/useAuth";
import "./styles/create.css";

export default function Create() {
	// get recipe id from url
	let params = useParams();
	let rid: string = params.rid ? params.rid : "";
	const auth = useAuth();

	const [userID, setUserID] = useState<string>("");

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
		dateStarted: Date.now().toString(),
		equipment: [{ item: "", quantity: 0 }],
		water: "",
		inital_gravity: 1,
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
		console.log("Submitting form...");
		if (!auth.user) return;
		const parsedBatchState = {
			...batchState,
			equipment: batchState.equipment.map((item) => ({
				...item,
				quantity: parseInt(item.quantity.toString()),
			})),
			author: auth.user.uid,
		};
		let res = await createBatch(auth.user, parsedBatchState);
		console.log(res);
		console.log("Form submitted with state:", parsedBatchState);
	};

	return (
		<div id="create-batch-form-container">
			<h2>Create Batch</h2>
			<form id="create-batch-form">
				<div>
					<label>Water:</label>
					<input
						type="text"
						name="water"
						value={batchState.water}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Initial Gravity:</label>
					<input
						type="number"
						name="inital_gravity"
						value={batchState.inital_gravity}
						onChange={handleChange}
					/>
				</div>
				<div>
					<div>Equipment</div>
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
					<label id="create-batch-stage-label">Stage:&nbsp;</label>
					<select
						name="stage"
						value={batchState.stage}
						onChange={handleStageChange}
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
