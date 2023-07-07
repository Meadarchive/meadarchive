import { Link } from "react-router-dom";
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
			<Link to="/" id="header-logo">Logo here</Link>
			<div id="header-browse">Browse </div>
			<Link to="/recipe/create" id="header-create-recipe">Create recipe</Link>
			<div id="header-see-batches">My batches</div>
			{user ? <SignOut /> : <SignIn />}
		</div>
	);
}
