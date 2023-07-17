import React, { useState } from 'react';

interface DeleteConfirmationProps {
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm }) => {
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
            Are you sure you want to delete this recipe? This process is irreversible.
          </p>
          <div id="delete-are-you-sure">
            <button className="delete-button" id="delete-cancel" onClick={handleCancelClick}>
              Cancel
            </button>
            <button className="delete-button" id="delete-confirm" onClick={handleConfirmClick}>
              Confirm
            </button>
          </div>
        </>
      ) : (
        <button className="delete-button" id="delete-recipe" onClick={handleDeleteClick}>
          Delete Recipe
        </button>
      )}
    </div>
  );
};

export default DeleteConfirmation;
