import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateFormState from "../create/interfaces/CreateFormState";

export default function View() {
	// get recipe id from url
	let params = useParams();
	let rid = params.rid;
	console.log(rid);

	const [recipe, setRecipe] = useState({} as CreateFormState);

	useEffect(() => {
		// get recipe from backend
		(async () => {
			console.log("test")
			let res = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/recipe?recipeID=${rid}`
			);
			let data = await res.json();
			console.log(data);
			setRecipe(data);
		})();
		console.log(recipe);
	}, []);

	// get recipe from backend
	return <div>recipe view</div>;
}
