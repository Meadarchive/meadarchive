import { BatchUpdate } from "../interfaces/batchInterface";
import firebase from "../../service/firebase";
import { getCreateBatchUpdateOptions } from "../options";

export default async function createBatchUpdate(
	user: firebase.User,
	update: BatchUpdate
) {
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/batch/update/create`,
		await getCreateBatchUpdateOptions(user, update)
	);
	const data = await res.json();
	return data;
}
