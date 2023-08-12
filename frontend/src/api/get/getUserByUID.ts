export default async function getUserByUID(uid: string) {
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/whoami?UserID=${uid}`
	);
	console.log(res);
	return res;
}
