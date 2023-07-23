export default async function getRecipesByUID(uid: string) {
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/recipe?userID=${uid}`
	);
	const data = await res.json();
	return data.recipes;
}
