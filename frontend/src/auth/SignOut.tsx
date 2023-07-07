import { useAuth } from "../hooks/useAuth";

export default function SignOut() {
	const { signOut } = useAuth();
	return <div onClick={() => signOut()}>Sign Out</div>;
}
