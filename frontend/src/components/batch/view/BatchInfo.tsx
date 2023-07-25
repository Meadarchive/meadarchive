import React from "react";
import { BatchWithUpdates } from "../../../api/interfaces/batchInterface";

interface BatchInfoProps {
	batchInfo: BatchWithUpdates;
}

const BatchInfo: React.FC<BatchInfoProps> = ({ batchInfo }) => {
	return (
		<div className="batch-info">
			<div>Stage: {batchInfo.stage}</div>
			<div>Date Started: {batchInfo.dateStarted}</div>
			<div>Initial Gravity: {batchInfo.initialGravity}</div>
			<div>Author: {batchInfo.author}</div>
			<div>Water: {batchInfo.water}</div>
		</div>
	);
};

export default BatchInfo;
