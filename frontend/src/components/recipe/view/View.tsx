import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeInterface from "./interfaces/RecipeInterface";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function View() {
	// get recipe id from url
	let params = useParams();
	let rid: string = params.rid ? params.rid : "";

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
					<div>Author: {recipe.author}</div>
					<h1>{recipe.recipeName}</h1>
					<div>Yeast Type: {recipe.yeastType}</div>
					<div>
						Recipe Size: {recipe.recipeSize} {recipe.recipeSizeUnit}
					</div>
					<div>
						Recipe Description:{" "}
						<MarkdownPreview source={recipe.recipeDescription} />
					</div>

					<h2>Honey Types</h2>
					{recipe.honeyTypes.map((honeyType, index) => (
						<div key={index}>
							<div>
								Amount: {honeyType.amount} {honeyType.unit}
							</div>
							<div>Honey: {honeyType.honey}</div>
						</div>
					))}

					<h2>Liquids</h2>
					{recipe.liquids.map((liquid, index) => (
						<div key={index}>
							<div>
								Amount: {liquid.amount} {liquid.unit}
							</div>
							<div>Liquid: {liquid.liquid}</div>
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
						<div>No chemicals used</div>
					)}

					<h2>Addons</h2>
					{recipe.addons.length > 0 ? (
						<ul>
							{recipe.addons.map((addon, index) => (
								<li key={index}>{addon.addon}</li>
							))}
						</ul>
					) : (
						<div>No chemicals used</div>
					)}
				</div>
			) : (
				<div>loading</div>
			)}
		</div>
	);
}
