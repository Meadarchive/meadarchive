import { useEffect, useState } from "react";
import getAllRecipes from "../../api/get/getAllRecipes";
import { useAuth } from "../../hooks/useAuth";
import DashboardRecipe from "../dashboard/DashboardRecipe";
import RecipeInterface from "./../recipe/view/interfaces/RecipeInterface";
import "./styles/browse.css";

function Browse() {
	const [recipes, setRecipes] = useState<RecipeInterface[]>([]); // Explicitly define the type as an array of RecipeInterface
	const [searchTerm, setSearchTerm] = useState<string>(""); // New state for search
	const { user } = useAuth();

	useEffect(() => {
		// get recipes from backend
		(async () => {
			setRecipes(await getAllRecipes());
		})();
	}, []);

	// Function to update search term
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	return (
		<>
			<input
				id="search-bar"
				type="text"
				value={searchTerm}
				onChange={handleSearch}
				placeholder="Search by recipe name"
			/>
			<div id="browse">
				{recipes &&
					Object.entries(recipes).map(([rid, recipe]) => {
						// Filter recipes based on the search term
						if (
							!searchTerm ||
							recipe.recipeName
								.toLowerCase()
								.includes(searchTerm.toLowerCase())
						) {
							return (
								<DashboardRecipe
									key={rid}
									recipe={recipe}
									user={user ? user : null}
									rid={rid}
								/>
							);
						}
						return null; // Do not render if the recipe doesn't match the search
					})}
			</div>
		</>
	);
}

export default Browse;
