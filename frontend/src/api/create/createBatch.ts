import firebase from "../../service/firebase";
import { getCreateBatchOptions } from "../options";
import { Batch } from "./interfaces/createBatchInterface";

export default async function createBatch(user: firebase.User, body: Batch) {
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/batch/create`,
		await getCreateBatchOptions(user, body)
	);
	const data = await res.json();
	return data;
}
