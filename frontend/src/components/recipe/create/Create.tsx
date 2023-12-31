import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import "./styles/containers.css";
import "./styles/form.css";
import { useAuth } from "../../../hooks/useAuth";
import CreateFormState from "./interfaces/CreateFormState";
import { useNavigate } from "react-router-dom";
import createRecipe from "../../../api/create/createRecipe";
import LoadingSpinner from "../../loading-spinner/LoadingSpinner";

const CreateForm: React.FC = () => {
	const [formState, setFormState] = useState<CreateFormState>({
		recipeName: "",
		recipeDescription: "",
		liquids: [
			{
				liquid: "",
				amount: 0,
				unit: "ml",
			},
		],
		yeastType: "",
		yeastAmount: 0,
		honeyTypes: [
			{
				honey: "",
				amount: 0,
				unit: "g",
			},
		],
		addons: [],
		chemicals: [],
		recipeSize: 1,
		recipeSizeUnit: "gallon",
	});

	const navigate = useNavigate();
	const user = useAuth().user;

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
		updatedLiquids[index] = {
			...updatedLiquids[index],
			[field]: value,
		};

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
		updatedHoneyTypes[index] = {
			...updatedHoneyTypes[index],
			[field]: value,
		};

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
		updatedAddons[index] = {
			...updatedAddons[index],
			[field]: value,
		};

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
		updatedChemicals[index] = {
			...updatedChemicals[index],
			[field]: value,
		};

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

	const handleRecipeSizeChange = (
		field: keyof CreateFormState,
		value: string
	) => {
		setFormState({
			...formState,
			[field]: value,
		});
	};

	const handleRecipeSizeUnitChange = (
		field: keyof CreateFormState,
		value: string
	) => {
		setFormState({
			...formState,
			[field]: value,
		});
	};

	const [errorMessages, setErrorMessages] = useState<
		{ path: string[]; message: string }[]
	>([]);
	const [loading, setLoading] = useState(false);

	const handleFormSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		if (!user) return;

		// Convert numbers to integers
		const parsedFormState = {
			...formState,
			liquids: formState.liquids.map((liquid) => ({
				...liquid,
				amount: Number(liquid.amount),
			})),
			yeastAmount: Number(formState.yeastAmount),
			honeyTypes: formState.honeyTypes.map((honey) => ({
				...honey,
				amount: Number(honey.amount),
			})),
			addons: formState.addons.map((addon) => ({
				...addon,
				amount: Number(addon.amount),
			})),
			chemicals: formState.chemicals.map((chemical) => ({
				...chemical,
				amount: Number(chemical.amount),
			})),
			recipeSize: Number(formState.recipeSize),
		};

		async function handleCreateRecipe() {
			if (!user) {
				return;
			}
			try {
				const res = await createRecipe(user, parsedFormState);
				if (res.error) {
					const messages = res.error.issues.map(
						(issue: { path: string[]; message: string }) => ({
							path: issue.path,
							message: issue.message,
						})
					);
					setErrorMessages(messages);
				} else {
					navigate(`/recipe/${res.recipeID}`);
				}
			} catch (error) {
				console.error("Error creating recipe:", error);
			}
		}

		setLoading(true);
		await handleCreateRecipe();
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
					type="number"
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
				<button
					className="remove-button"
					type="button"
					onClick={() => handleRemoveLiquid(index)}
				>
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
					type="number"
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
				<button
					className="remove-button"
					type="button"
					onClick={() => handleRemoveHoney(index)}
				>
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
					type="number"
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
				<button
					className="remove-button"
					type="button"
					onClick={() => handleRemoveAddon(index)}
				>
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
					type="number"
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
					className="remove-button"
					onClick={() => handleRemoveChemical(index)}
				>
					Remove
				</button>
			</div>
		));
	};

	return (
		<form id="create-form" onSubmit={handleFormSubmit}>
			{renderErrorMessages()}
			<div>
				<h3>Recipe Name</h3>
				<div className="error-message recipe-error"></div>
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
			</div>

			<div>
				<h3>Liquids and Amounts</h3>
				<div className="error-message recipe-error"></div>
				{renderLiquidInputs()}
				<button
					className="add-button"
					type="button"
					onClick={() =>
						setFormState({
							...formState,
							liquids: [
								...formState.liquids,
								{ liquid: "", amount: 0, unit: "ml" },
							],
						})
					}
				>
					Add Liquid
				</button>
			</div>

			<div>
				<h3>Yeast</h3>
				<div className="error-message recipe-error"></div>
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
							type="number"
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
				<div className="error-message recipe-error"></div>
				{renderHoneyInputs()}
				<button
					className="add-button"
					type="button"
					onClick={() =>
						setFormState({
							...formState,
							honeyTypes: [
								...formState.honeyTypes,
								{ honey: "", amount: 0, unit: "g" },
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
					className="add-button"
					type="button"
					onClick={() =>
						setFormState({
							...formState,
							chemicals: [
								...formState.chemicals,
								{ chemical: "", amount: 0, unit: "g" },
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
					className="add-button"
					type="button"
					onClick={() =>
						setFormState({
							...formState,
							addons: [
								...formState.addons,
								{ addon: "", amount: 0, unit: "g" },
							],
						})
					}
				>
					Add Addon
				</button>
			</div>

			<div>
				<h3>Recipe Size</h3>
				<div className="error-message recipe-error"></div>
				<div id="recipe-size-container">
					<input
						type="number"
						value={formState.recipeSize}
						onChange={(event) =>
							handleRecipeSizeChange(
								"recipeSize",
								event.target.value
							)
						}
						placeholder="Amount"
					/>
					<select
						value={formState.recipeSizeUnit}
						onChange={(event) =>
							handleRecipeSizeUnitChange(
								"recipeSizeUnit",
								event.target.value
							)
						}
					>
						<option value="gallon">gallons</option>
						<option value="litre">litres</option>
					</select>
				</div>
			</div>

			<div>
				<h3>Recipe Description</h3>
				<div className="error-message recipe-error"></div>
				<div id="recipe-description-container">
					<MDEditor
						value={formState.recipeDescription}
						onChange={(value) =>
							handleInputChange("recipeDescription", value || "")
						}
						previewOptions={{
							rehypePlugins: [[rehypeSanitize]],
						}}
						textareaProps={{
							placeholder: "Recipe Description"
						}}
						style={{ height: "300px" }}
					/>
				</div>
			</div>
			{loading ? (
				<LoadingSpinner />
			) : (
				<button id="create-recipe-button" type="submit">
					Submit
				</button>
			)}
		</form>
	);
};

export default CreateForm;
