import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import "./styles/dashboard.css";
import recipeSizeFormatter from "../recipe/view/helpers/recipeSizeFormatter";
import DeleteConfirmation from "../recipe/view/DeleteConfirmation";
import deleteRecipe from "../recipe/view/helpers/deleteRecipe";
import { Link } from "react-router-dom";

export default function Dashboard() {
	// get current user
	const { user } = useAuth();

	const [recipes, setRecipes] = useState<RecipeInterface[]>();

	useEffect(() => {
		// get recipes from backend
		user &&
			(async () => {
				let res = await fetch(
					`${import.meta.env.VITE_SERVER_URL}/recipe?userID=${
						user?.uid
					}`
				);
				let data = await res.json();
				console.log(data);
				setRecipes(data.recipes);
				console.log(recipes);
			})();
	}, [user]);
	return (
		<div>
			{recipes ? (
				<div id="dashboard">
					<h2 id="recipe-title">My recipes</h2>
					<div id="dashboard-recipes-container">
						{Object.entries(recipes).map(([rid, recipe]) => (
							<div
								key={rid}
								className="dashboard-recipe-container"
							>
								<div className="dashboard-recipe">
									<div className="dashboard-recipe-left">
										<div className="dashboard-recipe-title">
											<Link to={`/recipe/${rid}`}>
												{recipe.recipeName}
											</Link>
										</div>
										<div className="dashboard-recipe-yeast">
											{recipe.yeastType}{" "}
											{recipe.yeastAmount}g
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
											<DeleteConfirmation
												onConfirm={async () =>
													await deleteRecipe(
														rid,
														user
													)
												}
											/>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}
