export default async function getAllRecipes() {
	const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/recipe`);
	const data = await res.json();
	return data.recipes;
}
