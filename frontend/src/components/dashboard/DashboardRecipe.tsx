import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import "./styles/dashboard.css";
import recipeSizeFormatter from "../recipe/view/helpers/recipeSizeFormatter";
import DeleteConfirmation from "../recipe/view/DeleteConfirmation";
import deleteRecipe from "../../api/delete/deleteRecipe";
import firebase from "../../service/firebase";

interface DashboardRecipeProps {
	recipe: RecipeInterface;
	user: firebase.User | null;
	rid: string;
}

const DashboardRecipe: React.FC<DashboardRecipeProps> = ({
	recipe,
	user,
	rid,
}) => {
	const handleDeleteRecipe = async (
		rid: string,
		user: firebase.User | null
	) => {
		user && (await deleteRecipe(rid, user));
		// You might want to refresh the list of recipes after deleting
		// For example, fetch the updated list of recipes from the backend and update the state accordingly
	};

	const navigate = useNavigate()

	return (
		<div className="dashboard-recipe-container">
			<div className="dashboard-recipe">
				<div className="dashboard-recipe-left">
					<div className="dashboard-recipe-title">
						<Link to={`/recipe/${rid}`}>{recipe.recipeName}</Link>
					</div>
					<div className="dashboard-recipe-yeast">
						{recipe.yeastType} {recipe.yeastAmount}g
					</div>
					<div className="dashboard-recipe-size">
						{recipeSizeFormatter(
							recipe.recipeSizeUnit,
							recipe.recipeSize
						)}
					</div>
				</div>
				<div className="dashboard-delete-recipe">
					{user && (
						<>
							<DeleteConfirmation
								onConfirm={() => handleDeleteRecipe(rid, user)}
							/>
							<button
								className="create-batch-button"
								onClick={() => navigate(`/batch/create/${rid}`)}
							>
								Create Batch
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default DashboardRecipe;
