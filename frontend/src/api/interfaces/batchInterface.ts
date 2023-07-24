export interface Equipment {
	item: string;
	quantity: number;
}

export interface Batch {
	author: string;
	recipeID: string;
	dateStarted: string;
	equipment: Equipment[];
	initialGravity: number;
	water: string;
	stage: (typeof validStages)[number];
}

export interface BatchWithUpdates extends Batch {
	updates: {
		[updateID: string]:
			| TextBatchUpdate
			| GravityBatchUpdate
			| StageBatchUpdate;
	};
}

interface BaseBatchUpdate {
	batchID: string;
	updateDate: string;
	updateType: "text" | "gravity" | "stage";
}

interface TextBatchUpdate extends BaseBatchUpdate {
	updateType: "text";
	text: string;
}

interface GravityBatchUpdate extends BaseBatchUpdate {
	updateType: "gravity";
	newGravity: number;
}

interface StageBatchUpdate extends BaseBatchUpdate {
	updateType: "stage";
	newStage: string;
}

export const validStages = [
	"Not Started",
	"Primary Fermentation",
	"Secondary Fermentation",
	"Bottled",
	"Aging",
	"Completed",
] as const;
