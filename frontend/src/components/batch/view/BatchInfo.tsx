import React from "react";
import { BatchWithUpdates } from "../../../api/interfaces/batchInterface";

interface BatchInfoProps {
	batchInfo: BatchWithUpdates;
}

const BatchInfo: React.FC<BatchInfoProps> = ({ batchInfo }) => {
	const { stage, dateStarted, initialGravity, author, water } = batchInfo;

	return (
		<div className="batch-info">
			<div>Stage: {stage}</div>
			<div>Date Started: {dateStarted}</div>
			<div>Initial Gravity: {initialGravity}</div>
			<div>Author: {author}</div>
			<div>Water: {water}</div>
		</div>
	);
};

export default BatchInfo;
