export interface Equipment {
	item: string;
	quantity: number;
}

export interface Batch {
	batchName: string;
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

export interface BaseBatchUpdate {
	batchID: string;
	updateDate: string;
	updateType: "text" | "gravity" | "stage";
}

export interface TextBatchUpdate extends BaseBatchUpdate {
	updateType: "text";
	text: string;
}

export interface GravityBatchUpdate extends BaseBatchUpdate {
	updateType: "gravity";
	newGravity: number;
}

export interface StageBatchUpdate extends BaseBatchUpdate {
	updateType: "stage";
	newStage: string;
}

export interface BatchUpdate {
	batchID: string;
	updateDate: string;
	updateType: "text" | "gravity" | "stage";
	text?: string;
	newGravity?: number;
	newStage?: string;
}

export const validStages = [
	"Not Started",
	"Primary Fermentation",
	"Secondary Fermentation",
	"Bottled",
	"Aging",
	"Completed",
] as const;
