import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeInterface from "./interfaces/RecipeInterface";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { BsPen } from "react-icons/bs";
import {
	GiPowder,
	GiThermometerScale,
	GiHoneyJar,
	GiChemicalDrop,
} from "react-icons/gi";
import { MdOutlineAdd } from "react-icons/md";
import { IoWaterOutline } from "react-icons/io5";
import "./styles/view.css";

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
				<div id="view-recipe">
					<div className="view-recipe-title">{recipe.recipeName}</div>
					<div>
						<MarkdownPreview source={recipe.recipeDescription} />
					</div>
					<div className="view-recipe-subtitle">
						Yeast <GiPowder />
					</div>
					<div className="view-recipe-item">
						{recipe.yeastType} {recipe.yeastAmount}g
					</div>
					<div className="view-recipe-subtitle">
						Size <GiThermometerScale />
					</div>
					<div className="view-recipe-item">
						{recipe.recipeSize} {recipe.recipeSizeUnit}
					</div>

					<div className="view-recipe-subtitle">
						Honey Types <GiHoneyJar />
					</div>
					{recipe.honeyTypes.map((honeyType, index) => (
						<div
							className="view-recipe-item view-recipe-list-item"
							key={index}
						>
							{honeyType.honey} {honeyType.amount}
							{honeyType.unit}
						</div>
					))}
					<div className="view-recipe-subtitle">
						Liquids <IoWaterOutline />
					</div>
					{recipe.liquids.map((liquid, index) => (
						<div
							className="view-recipe-item view-recipe-list-item"
							key={index}
						>
							{liquid.liquid} {liquid.amount} {liquid.unit}
						</div>
					))}
					<div className="view-recipe-subtitle">
						Chemicals <GiChemicalDrop />
					</div>
					{recipe.chemicals.length > 0 ? (
						recipe.chemicals.map((chemical, index) => (
							<div
								className="view-recipe-item view-recipe-list-item"
								key={index}
							>
								{chemical.chemical}
							</div>
						))
					) : (
						<div className="view-recipe-item">
							No chemicals used
						</div>
					)}
					<div className="view-recipe-subtitle">
						Addons <MdOutlineAdd />
					</div>
					{recipe.addons.length > 0 ? (
						recipe.addons.map((addon, index) => (
							<div
								className="view-recipe-item view-recipe-list-item"
								key={index}
							>
								{addon.addon}
							</div>
						))
					) : (
						<div className="view-recipe-item">No addons</div>
					)}
					<div className="view-recipe-subtitle">
						Author: {recipe.author} <BsPen />
					</div>
				</div>
			) : (
				<div>loading</div>
			)}
		</div>
	);
}
