export default async function getUserByUID(uid: string) {
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/whoami?userID=${uid}`
	);
	const user = await res.json();
	return user;
}
