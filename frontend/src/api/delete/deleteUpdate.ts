import firebase from "../../service/firebase";
import { getDeleteUpdateOptions } from "../options";

export default async function deleteUpdate(
	user: firebase.User,
	bid: string,
	uid: string
) {
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/batch/update/delete`,
		await getDeleteUpdateOptions(user, bid, uid)
	);
	const data = await res.json();
	return data;
}
