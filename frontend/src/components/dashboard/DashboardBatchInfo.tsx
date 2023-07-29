import React from "react";
import { BatchWithUpdates } from "../../api/interfaces/batchInterface";
import { Link } from "react-router-dom";

interface BatchInfoProps {
	batchInfo: BatchWithUpdates;
}

const DashboardBatchInfo: React.FC<BatchInfoProps> = ({ batchInfo }) => {
	return (
		<div className="batch-info">
			<div className="dashboard-batch-stage">Stage: {batchInfo.stage}</div>
			<div className="dashboard-batch-gravity">Initial Gravity: {batchInfo.initialGravity}</div>
			<div className="dashboard-batch-recipeid">
				Recipe:
				<Link to={`/recipe/${batchInfo.recipeID}`}>
					{batchInfo.recipeID}
				</Link>
			</div>
		</div>
	);
};

export default DashboardBatchInfo;
