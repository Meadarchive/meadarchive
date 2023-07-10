import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeInterface from "./interfaces/RecipeInterface";

export default function View() {
	// get recipe id from url
	let params = useParams();
	let rid:string = params.rid ? params.rid : "";

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
				<div>
					<p>Author: {recipe.author}</p>
					<h1>{recipe.recipeName}</h1>
					<p>Yeast Type: {recipe.yeastType}</p>
					<p>
						Recipe Size: {recipe.recipeSize} {recipe.recipeSizeUnit}
					</p>
					<p>Recipe Description: {recipe.recipeDescription}</p>

					<h2>Honey Types</h2>
					{recipe.honeyTypes.map((honeyType, index) => (
						<div key={index}>
							<p>
								Amount: {honeyType.amount} {honeyType.unit}
							</p>
							<p>Honey: {honeyType.honey}</p>
						</div>
					))}


					<h2>Liquids</h2>
					{recipe.liquids.map((liquid, index) => (
						<div key={index}>
							<p>
								Amount: {liquid.amount} {liquid.unit}
							</p>
							<p>Liquid: {liquid.liquid}</p>
						</div>
					))}

					<h2>Chemicals</h2>
					{recipe.chemicals.length > 0 ? (
						<ul>
							{recipe.chemicals.map((chemical, index) => (
								<li key={index}>{chemical.chemical}</li>
							))}
						</ul>
					) : (
						<p>No chemicals used</p>
					)}

					<h2>Addons</h2>
					{recipe.addons.length > 0 ? (
						<ul>
							{recipe.addons.map((addon, index) => (
								<li key={index}>{addon.addon}</li>
							))}
						</ul>
					) : (
						<p>No chemicals used</p>
					)}
				</div>
			) : (
				<div>loading</div>
			)}
		</div>
	);
}
