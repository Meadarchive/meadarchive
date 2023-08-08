import { useAuth } from "../hooks/useAuth";

export default function SignOutButton() {
	const { signOut } = useAuth();

	const handleSignOutClick = () => {
		signOut();
	};

	return (
		<button onClick={handleSignOutClick} className="sign-out-button">
			Sign Out
		</button>
	);
}
