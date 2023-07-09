export default interface CreateFormState {
	recipeName: string;
	recipeDescription: string;
	liquids: { liquid: string; amount: number; unit: string }[];
	yeastType: string;
	yeastAmount: number;
	honeyTypes: { honey: string; amount: number; unit: string }[];
	addons: { addon: string; amount: number; unit: string }[];
	chemicals: { chemical: string; amount: number; unit: string }[];
	recipeSize: number;
	recipeSizeUnit: string;
}