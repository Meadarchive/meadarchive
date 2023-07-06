import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./styles/containers.css";
import "./styles/form.css";

interface CreateFormState {
	recipeName: string;
	recipeDescription: string;
	liquids: { liquid: string; amount: string; unit: string }[];
	yeastType: string;
	yeastAmount: string;
	honeyTypes: { honey: string; amount: string; unit: string }[];
	addons: { addon: string; amount: string; unit: string }[];
	chemicals: { chemical: string; amount: string; unit: string }[];
}

const CreateForm: React.FC = () => {
	const [formState, setFormState] = useState<CreateFormState>({
		recipeName: "",
		recipeDescription: "",
		liquids: [],
		yeastType: "",
		yeastAmount: "",
		honeyTypes: [],
		addons: [],
		chemicals: [],
	});

	const handleInputChange = (field: keyof CreateFormState, value: string) => {
		setFormState({
			...formState,
			[field]: value,
		});
	};

	const handleLiquidChange = (
		index: number,
		field: keyof (typeof formState.liquids)[number],
		value: string
	) => {
		const updatedLiquids = [...formState.liquids];
		updatedLiquids[index][field] = value;

		setFormState({
			...formState,
			liquids: updatedLiquids,
		});
	};

	const handleHoneyChange = (
		index: number,
		field: keyof (typeof formState.honeyTypes)[number],
		value: string
	) => {
		const updatedHoneyTypes = [...formState.honeyTypes];
		updatedHoneyTypes[index][field] = value;

		setFormState({
			...formState,
			honeyTypes: updatedHoneyTypes,
		});
	};

	const handleAddonChange = (
		index: number,
		field: keyof (typeof formState.addons)[number],
		value: string
	) => {
		const updatedAddons = [...formState.addons];
		updatedAddons[index][field] = value;

		setFormState({
			...formState,
			addons: updatedAddons,
		});
	};

	const handleChemicalChange = (
		index: number,
		field: keyof (typeof formState.chemicals)[number],
		value: string
	) => {
		const updatedChemicals = [...formState.chemicals];
		updatedChemicals[index][field] = value;

		setFormState({
			...formState,
			chemicals: updatedChemicals,
		});
	};

	const handleRemoveChemical = (index: number) => {
		const updatedChemicals = [...formState.chemicals];
		updatedChemicals.splice(index, 1);

		setFormState({
			...formState,
			chemicals: updatedChemicals,
		});
	};

	const handleRemoveLiquid = (index: number) => {
		const updatedLiquids = [...formState.liquids];
		updatedLiquids.splice(index, 1);

		setFormState({
			...formState,
			liquids: updatedLiquids,
		});
	};

	const handleRemoveHoney = (index: number) => {
		const updatedHoneyTypes = [...formState.honeyTypes];
		updatedHoneyTypes.splice(index, 1);

		setFormState({
			...formState,
			honeyTypes: updatedHoneyTypes,
		});
	};

	const handleRemoveAddon = (index: number) => {
		const updatedAddons = [...formState.addons];
		updatedAddons.splice(index, 1);

		setFormState({
			...formState,
			addons: updatedAddons,
		});
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// You can perform additional actions with the form data here
		console.log("Form submitted:", formState);
	};

	const renderLiquidInputs = () => {
		return formState.liquids.map((liquid, index) => (
			<div id="liquids-container" key={index}>
				<input
					type="text"
					value={liquid.liquid}
					onChange={(event) =>
						handleLiquidChange(index, "liquid", event.target.value)
					}
					placeholder="Liquid"
				/>
				<input
					type="text"
					value={liquid.amount}
					onChange={(event) =>
						handleLiquidChange(index, "amount", event.target.value)
					}
					placeholder="Amount"
				/>
				<select
					value={liquid.unit}
					onChange={(event) =>
						handleLiquidChange(index, "unit", event.target.value)
					}
				>
					<option value="ml">ml</option>
					<option value="oz">oz</option>
				</select>
				<button type="button" onClick={() => handleRemoveLiquid(index)}>
					Remove
				</button>
			</div>
		));
	};

	const renderHoneyInputs = () => {
		return formState.honeyTypes.map((honey, index) => (
			<div id="honey-container" key={index}>
				<input
					type="text"
					value={honey.honey}
					onChange={(event) =>
						handleHoneyChange(index, "honey", event.target.value)
					}
					placeholder="Honey"
				/>
				<input
					type="text"
					value={honey.amount}
					onChange={(event) =>
						handleHoneyChange(index, "amount", event.target.value)
					}
					placeholder="Amount"
				/>
				<select
					value={honey.unit}
					onChange={(event) =>
						handleHoneyChange(index, "unit", event.target.value)
					}
				>
					<option value="g">g</option>
					<option value="oz">oz</option>
				</select>
				<button type="button" onClick={() => handleRemoveHoney(index)}>
					Remove
				</button>
			</div>
		));
	};

	const renderAddonInputs = () => {
		return formState.addons.map((addon, index) => (
			<div id="addons-container" key={index}>
				<input
					type="text"
					value={addon.addon}
					onChange={(event) =>
						handleAddonChange(index, "addon", event.target.value)
					}
					placeholder="Addon"
				/>
				<input
					type="text"
					value={addon.amount}
					onChange={(event) =>
						handleAddonChange(index, "amount", event.target.value)
					}
					placeholder="Amount"
				/>
				<select
					value={addon.unit}
					onChange={(event) =>
						handleAddonChange(index, "unit", event.target.value)
					}
				>
					<option value="g">g</option>
					<option value="oz">oz</option>
				</select>
				<button type="button" onClick={() => handleRemoveAddon(index)}>
					Remove
				</button>
			</div>
		));
	};

	const renderChemicalInputs = () => {
		return formState.chemicals.map((chemical, index) => (
			<div id="chemicals-container" key={index}>
				<input
					type="text"
					value={chemical.chemical}
					onChange={(event) =>
						handleChemicalChange(
							index,
							"chemical",
							event.target.value
						)
					}
					placeholder="Chemical"
				/>
				<input
					type="text"
					value={chemical.amount}
					onChange={(event) =>
						handleChemicalChange(
							index,
							"amount",
							event.target.value
						)
					}
					placeholder="Amount"
				/>
				<select
					value={chemical.unit}
					onChange={(event) =>
						handleChemicalChange(index, "unit", event.target.value)
					}
				>
					<option value="g">g</option>
					<option value="oz">oz</option>
				</select>
				<button
					type="button"
					onClick={() => handleRemoveChemical(index)}
				>
					Remove
				</button>
			</div>
		));
	};

	return (
		<form id="create-form" onSubmit={handleFormSubmit}>
			<h3>Recipe Name</h3>
			<div id="recipe-name-container">
				<input
					type="text"
					value={formState.recipeName}
					onChange={(event) =>
						handleInputChange("recipeName", event.target.value)
					}
					placeholder="Recipe Name"
				/>
			</div>

			<div>
				<h3>Liquids and Amounts</h3>
				{renderLiquidInputs()}
				<button
					type="button"
					onClick={() =>
						setFormState({
							...formState,
							liquids: [
								...formState.liquids,
								{ liquid: "", amount: "", unit: "ml" },
							],
						})
					}
				>
					Add Liquid
				</button>
			</div>

			<div>
				<h3>Yeast</h3>
				<div id="yeast-container">
					<div>
						<input
							type="text"
							value={formState.yeastType}
							onChange={(event) =>
								handleInputChange(
									"yeastType",
									event.target.value
								)
							}
							placeholder="Yeast Type"
						/>
					</div>
					<div id="yeast-amount-container">
						<input
							type="text"
							value={formState.yeastAmount}
							onChange={(event) =>
								handleInputChange(
									"yeastAmount",
									event.target.value
								)
							}
							placeholder="Yeast Amount"
						/>
						<div className="symbol-container">g</div>
					</div>
				</div>
			</div>

			<div>
				<h3>Honey Types and Amounts</h3>
				{renderHoneyInputs()}
				<button
					type="button"
					onClick={() =>
						setFormState({
							...formState,
							honeyTypes: [
								...formState.honeyTypes,
								{ honey: "", amount: "", unit: "g" },
							],
						})
					}
				>
					Add Honey
				</button>
			</div>

			<div>
				<h3>Chemicals</h3>
				{renderChemicalInputs()}
				<button
					type="button"
					onClick={() =>
						setFormState({
							...formState,
							chemicals: [
								...formState.chemicals,
								{ chemical: "", amount: "", unit: "g" },
							],
						})
					}
				>
					Add Chemical
				</button>
			</div>

			<div>
				<h3>Addons</h3>
				{renderAddonInputs()}
				<button
					type="button"
					onClick={() =>
						setFormState({
							...formState,
							addons: [
								...formState.addons,
								{ addon: "", amount: "", unit: "g" },
							],
						})
					}
				>
					Add Addon
				</button>
			</div>

			<div>
				<h3>Recipe Description</h3>
				<div id="recipe-description-container">
					<MDEditor
						value={formState.recipeDescription}
						onChange={(value) =>
							handleInputChange("recipeDescription", value || "")
						}
						placeholder="Recipe Description"
						style={{ height: "300px" }}
					/>
				</div>
			</div>

			<button type="submit">Submit</button>
		</form>
	);
};

export default CreateForm;
