import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import "./styles/dashboard.css";
import DashboardRecipe from "./DashboardRecipe";
import getRecipesByUID from "../../api/get/getRecipesByUID";
import getBatchesByUID from "../../api/get/getBatchesByUID";
import { BatchWithUpdates } from "../../api/interfaces/batchInterface";
import BatchInfo from "../batch/view/BatchInfo";
import "../batch/view/styles/view.css";

export default function Dashboard() {
	// get current user
	const { user } = useAuth();

	const [recipes, setRecipes] = useState<RecipeInterface[]>();
	const [batches, setBatches] = useState<BatchWithUpdates[]>();

	useEffect(() => {
		// get recipes from backend
		user &&
			(async () => {
				setRecipes(await getRecipesByUID(user.uid));
				setBatches(await getBatchesByUID(user.uid));
			})();
		console.log(batches);
	}, [user]);
	return (
		<div>
			<div id="dashboard">
				<h2 id="recipes-title">My recipes</h2>
				{recipes ? (
					<>
						<div id="dashboard-recipes-container">
							{Object.entries(recipes).map(([rid, recipe]) => (
								<DashboardRecipe
									key={rid}
									rid={rid}
									recipe={recipe}
									user={user}
								/>
							))}
						</div>
					</>
				) : (
					<LoadingSpinner />
				)}
				<h2 id="batches-title">My batches</h2>
				{batches ? (
					<div id="dashboard-bathes-container">
						{Object.entries(batches).map(([key, batch]) => (
							<div className="starting-container">
								<BatchInfo key={key} batchInfo={batch} />
							</div>
						))}
					</div>
				) : (
					<LoadingSpinner />
				)}
			</div>
		</div>
	);
}
