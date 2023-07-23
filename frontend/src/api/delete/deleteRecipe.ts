import { getDeleteRecipeOptions } from "../options";
import firebase from "../../service/firebase";

export default async function deleteRecipe(rid: string, user: firebase.User) {
	// delete recipe from backend
	let res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/recipe/delete`,
		await getDeleteRecipeOptions(user, rid)
	);

	// if recipe was deleted, redirect to home page
	if (res.status === 200) {
		window.location.href = "/";
	}
}
