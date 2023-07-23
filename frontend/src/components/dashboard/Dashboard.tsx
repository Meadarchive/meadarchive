import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import "./styles/dashboard.css";
import DashboardRecipe from "./DashboardRecipe";

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
