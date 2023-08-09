import React from "react";
import { BatchWithUpdates } from "../../api/interfaces/batchInterface";
import { Link } from "react-router-dom";

interface BatchInfoProps {
	batchInfo: BatchWithUpdates;
}

const DashboardBatchInfo: React.FC<BatchInfoProps> = ({ batchInfo }) => {
	const { stage, initialGravity, recipeID } = batchInfo;

	return (
		<div className="batch-info">
			<div className="dashboard-batch-stage">Stage: {stage}</div>
			<div className="dashboard-batch-gravity">
				Initial Gravity: {initialGravity}
			</div>
			<div className="dashboard-batch-recipeid">
				Recipe:&nbsp;
				<Link to={`/recipe/${recipeID}`}>{recipeID}</Link>
			</div>
		</div>
	);
};

export default DashboardBatchInfo;
