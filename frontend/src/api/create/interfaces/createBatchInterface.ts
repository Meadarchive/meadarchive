interface Equipment {
	item: string;
	quantity: number;
}

export interface Batch {
	author: string;
	recipeID: string;
	dateStarted: string;
	equipment: Equipment[];
	inital_gravity: number;
	water: string;
	stage: (typeof validStages)[number]; // Use the union type from the original validStages array
}

export const validStages = [
	"Not Started",
	"Primary Fermentation",
	"Secondary Fermentation",
	"Bottled",
	"Aging",
	"Completed",
] as const;
