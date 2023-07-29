import React from "react";
import { BatchWithUpdates } from "../../api/interfaces/batchInterface";

interface BatchInfoProps {
	batchInfo: BatchWithUpdates;
}

const DashboardBatchInfo: React.FC<BatchInfoProps> = ({ batchInfo }) => {
	return (
		<div className="batch-info">
			<div>Stage: {batchInfo.stage}</div>
			<div>Date Started: {batchInfo.dateStarted}</div>
			<div>Initial Gravity: {batchInfo.initialGravity}</div>
		</div>
	);
};

export default DashboardBatchInfo;
