// UpdatesContainer.tsx
import React from "react";
import UpdateItem from "./UpdateItem";

interface BatchInfo {
	updates: { [key: string]: { [key: string]: any } };
}

interface UpdatesContainerProps {
	batchInfo: BatchInfo | null;
}

const UpdatesContainer: React.FC<UpdatesContainerProps> = ({ batchInfo }) => {
	return batchInfo?.updates ? (
		<div id="updates-container">
			<div id="updates-title">Updates</div>
			<div className="updates-list">
				{Object.entries(batchInfo.updates).map(([key, update]) => (
					<UpdateItem key={key} update={update} />
				))}
			</div>
		</div>
	) : (
		<div id="updates-container">no updates</div>
	);
};

export default UpdatesContainer;
