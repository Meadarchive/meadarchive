import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeInterface from "./interfaces/RecipeInterface";
import { useAuth } from "../../../hooks/useAuth";
import "../../../global_styles/text.css";
import "./styles/delete.css";
import "./styles/view.css";
import LoadingSpinner from "../../loading-spinner/LoadingSpinner";
import RecipeView from "./RecipeView";

export default function View() {
	// get recipe id from url
	let params = useParams();
	let rid: string = params.rid ? params.rid : "";

	// get current user
	const { user } = useAuth();

	const [recipe, setRecipe] = useState<RecipeInterface>();

	useEffect(() => {
		// get recipe from backend
		(async () => {
			let res = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/recipe?recipeID=${rid}`
			);
			let data = await res.json();
			setRecipe(data.recipes[rid]);
		})();
	}, []);

	// get recipe from backend
	return (
		<div>
			{recipe ? (
				<RecipeView recipe={recipe} user={user} rid={rid} />
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}
