import React from "react";
import {
	GiPowder,
	GiThermometerScale,
	GiHoneyJar,
	GiChemicalDrop,
} from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import { MdOutlineAdd } from "react-icons/md";
import { BsPen } from "react-icons/bs";
import MarkdownPreview from "@uiw/react-markdown-preview";
import DeleteConfirmation from "./DeleteConfirmation";
import deleteRecipe from "./helpers/deleteRecipe";
import RecipeInterface from "./interfaces/RecipeInterface";
import firebase from "../../../service/firebase";
import "./styles/view.css";

interface RecipeViewProps {
	recipe: RecipeInterface;
	user?: firebase.User | null;
	rid: string;
}

const RecipeView: React.FC<RecipeViewProps> = ({ recipe, user, rid }) => {

	return (
		<div className="recipe-view">
			<div className="recipe-view-title">{recipe.recipeName}</div>
			<div>
				<MarkdownPreview source={recipe.recipeDescription} />
			</div>
			<div className="recipe-view-subtitle">
				Yeast <GiPowder />
			</div>
			<div className="recipe-view-item">
				{recipe.yeastType} {recipe.yeastAmount}g
			</div>
			<div className="recipe-view-subtitle">
				Size <GiThermometerScale />
			</div>
			<div className="recipe-view-item">
				{recipe.recipeSize} {recipe.recipeSizeUnit}
			</div>

			<div className="recipe-view-subtitle">
				Honey Types <GiHoneyJar />
			</div>
			{recipe.honeyTypes.map((honeyType, index) => (
				<div
					className="recipe-view-item recipe-view-list-item"
					key={index}
				>
					{honeyType.honey} {honeyType.amount}
					{honeyType.unit}
				</div>
			))}
			<div className="recipe-view-subtitle">
				Liquids <IoWaterOutline />
			</div>
			{recipe.liquids.map((liquid, index) => (
				<div
					className="recipe-view-item recipe-view-list-item"
					key={index}
				>
					{liquid.liquid} {liquid.amount} {liquid.unit}
				</div>
			))}
			<div className="recipe-view-subtitle">
				Chemicals <GiChemicalDrop />
			</div>
			{recipe.chemicals.length > 0 ? (
				recipe.chemicals.map((chemical, index) => (
					<div
						className="recipe-view-item recipe-view-list-item"
						key={index}
					>
						{chemical.chemical}
					</div>
				))
			) : (
				<div className="recipe-view-item">No chemicals used</div>
			)}
			<div className="recipe-view-subtitle">
				Addons <MdOutlineAdd />
			</div>
			{recipe.addons.length > 0 ? (
				recipe.addons.map((addon, index) => (
					<div
						className="recipe-view-item recipe-view-list-item"
						key={index}
					>
						{addon.addon}
					</div>
				))
			) : (
				<div className="recipe-view-item">No addons</div>
			)}
			<div className="recipe-view-subtitle">
				Author: {recipe.author} <BsPen />
			</div>
			{user && user.uid === recipe.author && (
				<DeleteConfirmation
					onConfirm={async () => await deleteRecipe(rid, user)}
				/>
			)}
		</div>
	);
};

export default RecipeView;
