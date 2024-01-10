import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";

const CountRecipes = ({ userRecipes }: { userRecipes: RecipeInterface[] }) => {
	const recipeCount = Object.entries(userRecipes).length;

	if (recipeCount === 1) {
		return <div>1 recipe</div>;
	} else if (recipeCount > 1) {
		return <div>{recipeCount} recipes</div>;
	} else {
		return <div>No recipes</div>;
	}
};

export default CountRecipes;
