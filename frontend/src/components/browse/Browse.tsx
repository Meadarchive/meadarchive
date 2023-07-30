import "./styles/browse.css";
import RecipeInterface from "./../recipe/view/interfaces/RecipeInterface";
import { useEffect, useState } from "react";
import getAllRecipes from "../../api/get/getAllRecipes";
import RecipeView from "../recipe/view/RecipeView";

function Browse() {
	const [recipes, setRecipes] = useState<RecipeInterface[]>();
	useEffect(() => {
		// get recipes from backend
		(async () => {
			setRecipes(await getAllRecipes());
		})();
	}, []);
	return (
		<div>
			{recipes &&
				Object.entries(recipes).map(([rid, recipe]) => (
					<div key={rid}>
						<RecipeView recipe={recipe} user={null} rid={rid} />
					</div>
				))}
		</div>
	);
}

export default Browse;
