import { getDeleteRecipeOptions } from "../options";
import firebase from "../../service/firebase";
import { useNavigate } from "react-router-dom";

export default async function deleteRecipe(rid: string, user: firebase.User) {
	const navigate = useNavigate()
	// delete recipe from backend
	let res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/recipe/delete`,
		await getDeleteRecipeOptions(user, rid)
	);

	// if recipe was deleted, redirect to home page
	if (res.status === 200) {
		navigate("/dashboard");
	}
}
