import { getDeleteBatchOptions } from "../options";
import firebase from "../../service/firebase";
import { useNavigate } from "react-router-dom";

export default async function deleteBatch(bid: string, user: firebase.User) {
	const navigate = useNavigate()
	// delete Batch from backend
	let res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/batch/delete`,
		await getDeleteBatchOptions(user, bid)
	);

	// if Batch was deleted, redirect to home page
	if (res.status === 200) {
		navigate("/dashboard");
	}
}
