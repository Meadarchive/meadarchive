import { getDeleteRecipeOptions } from "../options";
import firebase from "../../service/firebase";

export default async function deleteRecipe(rid: string, user: firebase.User) {
	await fetch(
		`${import.meta.env.VITE_SERVER_URL}/recipe/delete`,
		await getDeleteRecipeOptions(user, rid)
	);
}
