import { BatchUpdate } from "../interfaces/batchInterface";
import firebase from "../../service/firebase";
import { getCreateBatchUpdateaOptions } from "../options";

export default async function createBatchUpdate(
	user: firebase.User,
	bid: string,
	update: BatchUpdate
) {
    console.log("createBatchUpdate")
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/batch/update/create`,
		await getCreateBatchUpdateaOptions(user, bid, update)
	);
	const data = await res.json();
	return data;
}
