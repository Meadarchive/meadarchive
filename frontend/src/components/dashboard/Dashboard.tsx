import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import "./styles/dashboard.css";
import DashboardRecipe from "./DashboardRecipe";
import getRecipesByUID from "../../api/get/getRecipesByUID";

export default function Dashboard() {
	// get current user
	const { user } = useAuth();

	const [recipes, setRecipes] = useState<RecipeInterface[]>();

	useEffect(() => {
		// get recipes from backend
		user &&
			(async () => {
				setRecipes(await getRecipesByUID(user.uid));
			})();
	}, [user]);
	return (
		<div>
			{recipes ? (
				<div id="dashboard">
					<h2 id="dashboard-title">My recipes</h2>
					<div id="dashboard-recipes-container">
						{Object.entries(recipes).map(([rid, recipe]) => (
							<DashboardRecipe
								rid={rid}
								recipe={recipe}
								user={user}
							/>
						))}
					</div>
				</div>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}
