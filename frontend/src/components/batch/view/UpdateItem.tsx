import React from "react";
import DeleteConfirmation from "../../recipe/view/DeleteConfirmation";
import { useAuth } from "../../../hooks/useAuth";
import deleteUpdate from "../../../api/delete/deleteUpdate";
import { useNavigate } from "react-router-dom";

interface UpdateItemProps {
	update: { [key: string]: any };
	uid: string;
	author: string;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ update, uid, author }) => {
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleDeleteUpdate = async () => {
		if (user) {
			await deleteUpdate(user, update.batchID, uid);
			navigate(`/batch/${update.batchID}`);
		}
	};

	const renderUpdateProperties = () => {
		return Object.entries(update).map(([propKey, propValue]) => (
			<div key={propKey}>
				{propKey}: {propValue}
			</div>
		));
	};

	const renderDeleteConfirmation = () => {
		if (user && user.uid === author) {
			return (
				<div className="delete-update-container">
					<DeleteConfirmation
						onConfirm={handleDeleteUpdate}
						whatIsBeingDeleted="update"
					/>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="update">
			{renderUpdateProperties()}
			{renderDeleteConfirmation()}
		</div>
	);
};

export default UpdateItem;
