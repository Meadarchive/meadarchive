import { getCreateRecipeOptions } from "../options";
import CreateFormState from "../../components/recipe/create/interfaces/CreateFormState";

import firebase from "../../service/firebase";

export default async function createRecipe(
	user: firebase.User,
	body: CreateFormState
) {
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/recipe/create`,
		await getCreateRecipeOptions(user, body)
	);
	const data = await res.json();
	return data;
}
