import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import recipeSizeFormatter from "../recipe/view/helpers/recipeSizeFormatter";
import DeleteConfirmation from "../recipe/view/DeleteConfirmation";
import deleteRecipe from "../../api/delete/deleteRecipe";
import firebase from "../../service/firebase";

interface BrowseRecipeProps {
	recipe: RecipeInterface;
	user: firebase.User | null;
	rid: string;
	refetchData?: () => void;
}

const BrowseRecipe: React.FC<BrowseRecipeProps> = ({
	recipe,
	user,
	rid,
	refetchData,
}) => {
	const handleDeleteRecipe = async (
		rid: string,
		user: firebase.User | null
	) => {
		if (user) {
			await deleteRecipe(rid, user);
			if (refetchData) {
				refetchData();
			}
		}
	};

	const navigate = useNavigate();
	const isAuthor = user && user.uid === recipe.author;

	return (
		<div className="dashboard-recipe-container">
			<div className="dashboard-recipe">
				<div className="dashboard-recipe-left">
					<div className="dashboard-recipe-title">
						<Link to={`/recipe/${rid}`}>{recipe.recipeName}</Link>
					</div>
					<div className="dashboard-recipe-yeast">
						{`${recipe.yeastType} ${recipe.yeastAmount}g`}
					</div>
					<div className="dashboard-recipe-size">
						{recipeSizeFormatter(
							recipe.recipeSizeUnit,
							recipe.recipeSize
						)}
					</div>
					<Link to={`/user/${recipe.author}`}>{recipe.author}</Link>
				</div>
				<div className="dashboard-delete-recipe">
					{user ? (
						<>
							{isAuthor && (
								<DeleteConfirmation
									onConfirm={() =>
										handleDeleteRecipe(rid, user)
									}
									whatIsBeingDeleted="recipe"
								/>
							)}
							<button
								className="create-batch-button"
								onClick={() => navigate(`/batch/create/${rid}`)}
							>
								Create Batch
							</button>
						</>
					) : (
						<Link
							className="sign-in-to-create-batch-link"
							to="/sign-in"
						>
							Sign in to create batch!
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default BrowseRecipe;
