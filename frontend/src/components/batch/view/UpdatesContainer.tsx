import React from "react";
import UpdateItem from "./UpdateItem";

interface Update {
	[key: string]: any;
}

interface BatchInfo {
	updates: { [key: string]: Update };
	author: string;
}

interface UpdatesContainerProps {
	batchInfo: BatchInfo | null;
}

const UpdatesContainer: React.FC<UpdatesContainerProps> = ({ batchInfo }) => {
	if (!batchInfo) {
		return <div id="updates-container">no updates</div>;
	}

	const { author, updates } = batchInfo;

	return (
		<div id="updates-container">
			<div id="updates-title">Updates</div>
			<div className="updates-list">
				{Object.entries(updates).map(([uid, update]) => (
					<UpdateItem
						author={author}
						uid={uid}
						key={uid}
						update={update}
					/>
				))}
			</div>
		</div>
	);
};

export default UpdatesContainer;
