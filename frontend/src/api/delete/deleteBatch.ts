import { getDeleteBatchOptions } from "../options";
import firebase from "../../service/firebase";

export default async function deleteBatch(bid: string, user: firebase.User) {
	await fetch(
		`${import.meta.env.VITE_SERVER_URL}/batch/delete`,
		await getDeleteBatchOptions(user, bid)
	);

	return "/dashboard";
}
