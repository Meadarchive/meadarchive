// UpdateItem.tsx
import React from "react";
import DeleteConfirmation from "../../recipe/view/DeleteConfirmation";
import { useAuth } from "../../../hooks/useAuth";
import deleteUpdate from "../../../api/delete/deleteUpdate";

interface UpdateItemProps {
	update: { [key: string]: any };
	uid: string;
	author: string;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ update, uid, author }) => {
	const { user } = useAuth();
	const handleDeleteUpdate = async () => {
		user && (await deleteUpdate(user, update.batchID, uid));
		window.location.href = `/batch/${update.batchID}`
	}
	return (
		<div className="update">
			{Object.entries(update).map(([propKey, propValue]) => (
				<div key={propKey}>
					{propKey}: {propValue}
				</div>
			))}
			{user && user.uid === author &&  (
				<div className="delete-update-container">
					<DeleteConfirmation
						onConfirm={handleDeleteUpdate}
						whatIsBeingDeleted="update"
					/>
				</div>
			)}
		</div>
	);
};

export default UpdateItem;
