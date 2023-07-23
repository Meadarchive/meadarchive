export default async function getRecipeByRID(rid: string) {
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/recipe?recipeID=${rid}`
	);
	const data = await res.json();
	return data.recipes[rid];
}
