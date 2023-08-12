import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeInterface from "./interfaces/RecipeInterface";
import { useAuth } from "../../../hooks/useAuth";
import "../../../global_styles/text.css";
import "./styles/delete.css";
import "./styles/view.css";
import LoadingSpinner from "../../loading-spinner/LoadingSpinner";
import RecipeView from "./RecipeView";
import getRecipeByRID from "../../../api/get/getRecipeByRID";

interface ViewProps {}

const View: React.FC<ViewProps> = () => {
	const params = useParams();
	const rid = (params as { [key: string]: any }).rid;

	const { user } = useAuth();

	const [recipe, setRecipe] = useState<RecipeInterface | undefined>();

	useEffect(() => {
		const fetchRecipe = async () => {
			const fetchedRecipe = await getRecipeByRID(rid);
			setRecipe(fetchedRecipe);
		};
		fetchRecipe();
	}, [rid]);

	return (
		<div>
			{recipe ? (
				<RecipeView recipe={recipe} user={user} rid={rid} />
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
};

export default View;
