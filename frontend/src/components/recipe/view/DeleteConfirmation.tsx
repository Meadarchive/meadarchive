import React, { useState } from "react";

interface DeleteConfirmationProps {
	onConfirm: () => void;
	whatIsBeingDeleted: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
	onConfirm,
	whatIsBeingDeleted,
}) => {
	const [confirming, setConfirming] = useState(false);

	const handleDeleteClick = () => {
		setConfirming(true);
	};

	const handleCancelClick = () => {
		setConfirming(false);
	};

	const handleConfirmClick = () => {
		setConfirming(false);
		onConfirm();
	};

	return (
		<div id="delete-container">
			{confirming ? (
				<>
					<p className="text-danger">
						Are you sure you want to delete this{" "}
						{whatIsBeingDeleted}? This process is irreversible.
					</p>
					<div id="delete-are-you-sure">
						<button
							className="delete-button"
							id="delete-cancel"
							onClick={handleCancelClick}
						>
							Cancel
						</button>
						<button
							className="delete-button"
							id="delete-confirm"
							onClick={handleConfirmClick}
						>
							Confirm
						</button>
					</div>
				</>
			) : (
				<button
					className="delete-button"
					id="delete-recipe"
					onClick={handleDeleteClick}
				>
					Delete{" "}
					{whatIsBeingDeleted.charAt(0).toUpperCase() +
						whatIsBeingDeleted.slice(1)}
				</button>
			)}
		</div>
	);
};

export default DeleteConfirmation;
