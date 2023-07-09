import { Link } from "react-router-dom";
import SignOut from "../../auth/SignOut";
import { useAuth } from "../../hooks/useAuth";
import "./styles/header.css";

export default function Header() {
	const auth = useAuth();
	const user = auth.user;
	console.log(user);
	return (
		<div id="header-container">
			<div id="header-logo-container">
				<Link to="/" id="header-logo">
					Logo here
				</Link>
			</div>
			<div id="header-rest-container">
				<Link to="/browse" id="header-browse">
					Browse{" "}
				</Link>
				<Link to="/recipe/create" id="header-create-recipe">
					Create recipe
				</Link>
				<Link to="dashboard" id="header-see-batches">
					My dashboard
				</Link>
				{user ? <SignOut /> : <Link to="/sign-in">Sign in</Link>}
			</div>
		</div>
	);
}
