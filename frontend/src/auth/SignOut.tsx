import { useAuth } from "../hooks/useAuth";
import "./styles/signout.css"

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
