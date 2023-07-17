import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

export default function Dashboard() {
	// get current user
	const { user } = useAuth();

	const [recipes, setRecipes] = useState<RecipeInterface[]>();

	useEffect(() => {
		// get recipe from backend
		user &&
			(async () => {
				let res = await fetch(
					`${import.meta.env.VITE_SERVER_URL}/recipe?userID=${
						user?.uid
					}`
				);
				let data = await res.json();
				console.log(data);
				setRecipes(data.recipes);
				console.log(recipes);
			})();
	}, [user]);
	return (
		<div>
			{recipes ? (
				<div>
					<h2>User's Recipe List</h2>
					<ul>
						{Object.entries(recipes).map(([recipeId, recipe]) => (
							<li key={recipeId}>
								<h3>{recipe.recipeName}</h3>
								<p>Author: {recipe.author}</p>
								<p>Yeast Type: {recipe.yeastType}</p>
								<p>Yeast Amount: {recipe.yeastAmount}</p>
								<p>Recipe Size: {recipe.recipeSize}</p>
								<p>Recipe Size Unit: {recipe.recipeSizeUnit}</p>
								<p>
									Recipe Description:{" "}
									{recipe.recipeDescription}
								</p>
								<h4>Honey Types:</h4>
								<ul>
									{recipe.honeyTypes.map(
										(honeyType, index) => (
											<li key={index}>
												{honeyType.amount}{" "}
												{honeyType.unit} -{" "}
												{honeyType.honey}
											</li>
										)
									)}
								</ul>
								<h4>Liquids:</h4>
								<ul>
									{recipe.liquids.map((liquid, index) => (
										<li key={index}>
											{liquid.amount} {liquid.unit} -{" "}
											{liquid.liquid}
										</li>
									))}
								</ul>
								<h4>Chemicals:</h4>
								<ul>
									{recipe.chemicals.map((chemical, index) => (
										<li key={index}>
											{chemical.amount} {chemical.unit} -{" "}
											{chemical.chemical}
										</li>
									))}
								</ul>
								<h4>Addons:</h4>
								<ul>
									{recipe.addons.map((addon, index) => (
										<li key={index}>
											{addon.amount} {addon.unit} -{" "}
											{addon.addon}
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}
