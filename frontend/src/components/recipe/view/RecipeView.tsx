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
import deleteRecipe from "../../../api/delete/deleteRecipe";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styles/view.css";
import recipeSizeFormatter from "./helpers/recipeSizeFormatter";
import RecipeInterface from "./interfaces/RecipeInterface";
import firebase from "../../../service/firebase"

interface RecipeViewProps {
	recipe: RecipeInterface;
	user?: firebase.User | null;
	rid: string;
}

const renderListItem = (item: { [key: string]: any }, index: number) => (
	<div className="recipe-view-item recipe-view-list-item" key={index}>
		{item.honey || item.liquid || item.chemical || item.addon} {item.amount}
		{item.unit}
	</div>
);

const RecipeView: React.FC<RecipeViewProps> = ({ recipe, user, rid }) => {
	const navigate = useNavigate();

	return (
		<div className="recipe-view">
			<div className="recipe-view-title">{recipe.recipeName}</div>
			<div>
				<MarkdownPreview  source={recipe.recipeDescription} />
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
				{recipeSizeFormatter(recipe.recipeSizeUnit, recipe.recipeSize)}
			</div>

			<div className="recipe-view-subtitle">
				Honey Types <GiHoneyJar />
			</div>
			{recipe.honeyTypes.map(renderListItem)}

			<div className="recipe-view-subtitle">
				Liquids <IoWaterOutline />
			</div>
			{recipe.liquids.map(renderListItem)}

			<div className="recipe-view-subtitle">
				Chemicals <GiChemicalDrop />
			</div>
			{recipe.chemicals.length > 0 ? (
				recipe.chemicals.map(renderListItem)
			) : (
				<div className="recipe-view-item">No chemicals used</div>
			)}

			<div className="recipe-view-subtitle">
				Addons <MdOutlineAdd />
			</div>
			{recipe.addons.length > 0 ? (
				recipe.addons.map(renderListItem)
			) : (
				<div className="recipe-view-item">No addons</div>
			)}

			<div>
				<span id="recipe-author">{recipe.author}</span> <BsPen />
			</div>
			<div id="buttons-container">
				{user && user.uid === recipe.author && (
					<DeleteConfirmation
						onConfirm={async () => await deleteRecipe(rid, user)}
						whatIsBeingDeleted="recipe"
					/>
				)}
				{user ? (
					<button
						id="create-batch-button"
						onClick={() => navigate(`/batch/create/${rid}`)}
					>
						Create Batch
					</button>
				) : (
					<div>
						<Link className="bold-link" to="/sign-in">
							Log in
						</Link>{" "}
						to create a batch
					</div>
				)}
			</div>
		</div>
	);
};

export default RecipeView;