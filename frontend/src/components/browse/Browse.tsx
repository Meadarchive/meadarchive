import "./styles/browse.css";
import RecipeInterface from "./../recipe/view/interfaces/RecipeInterface";
import { useEffect, useState } from "react";
import getAllRecipes from "../../api/get/getAllRecipes";

function Browse() {
	const [recipes, setRecipes] = useState<RecipeInterface[]>();
	useEffect(() => {
		// get recipes from backend
		(async () => {
			setRecipes(await getAllRecipes());
		})();
	}, []);
	return <div>Browse</div>;
}

export default Browse;
