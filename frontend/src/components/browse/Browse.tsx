import { useEffect, useState, ChangeEvent } from "react";
import getAllRecipes from "../../api/get/getAllRecipes";
import { useAuth } from "../../hooks/useAuth";
import BrowseRecipe from "./BrowseRecipe";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import "./styles/browse.css";

function Browse() {
	const [recipes, setRecipes] = useState<{ [rid: string]: RecipeInterface }>(
		{}
	);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const { user } = useAuth();

	useEffect(() => {
		const fetchRecipes = async () => {
			const fetchedRecipes = await getAllRecipes();
			setRecipes(fetchedRecipes);
		};

		fetchRecipes();
	}, []);

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
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
				{Object.entries(recipes).map(([rid, recipe]) => {
					if (
						!searchTerm ||
						recipe.recipeName
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					) {
						return (
							<BrowseRecipe
								key={rid}
								recipe={recipe}
								user={user || null}
								rid={rid}
							/>
						);
					}
					return null;
				})}
			</div>
		</>
	);
}

export default Browse;
