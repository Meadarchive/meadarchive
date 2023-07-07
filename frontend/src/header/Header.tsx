import SignIn from "../auth/SignIn";
import SignOut from "../auth/SignOut";
import { useAuth } from "../hooks/useAuth";
import "./styles/header.css";

export default function Header() {
	const auth = useAuth();
	const user = auth.user;
	console.log(user);
	return (
		<div id="header-container">
			<div id="header-logo">Logo here</div>
			<div id="header-browse">Browse </div>
			<div id="header-create-recipe">Create recipe</div>
			<div id="header-see-batches">My batches</div>
			{user ? <SignOut /> : <SignIn />}
		</div>
	);
}
