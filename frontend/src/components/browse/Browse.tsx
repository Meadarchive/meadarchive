import "./styles/browse.css";
import RecipeInterface from "./../recipe/view/interfaces/RecipeInterface";
import { useEffect, useState } from "react";
import getAllRecipes from "../../api/get/getAllRecipes";
import { useAuth } from "../../hooks/useAuth";
import DashboardRecipe from "../dashboard/DashboardRecipe";

function Browse() {
	const [recipes, setRecipes] = useState<RecipeInterface[]>();
	useEffect(() => {
		// get recipes from backend
		(async () => {
			setRecipes(await getAllRecipes());
		})();
	}, []);
	const { user } = useAuth();
	return (
        
		<div id="browse">
			{recipes &&
				Object.entries(recipes).map(([rid, recipe]) => (
					<div key={rid}>
						<DashboardRecipe recipe={recipe} user={user ? user : null} rid={rid} />
					</div>
				))}
		</div>
	);
}

export default Browse;
