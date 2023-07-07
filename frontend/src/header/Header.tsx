import SignIn from "../auth/SignIn";
import "./styles/header.css";

export default function Header() {
	return (
		<div id="header-container">
			<div id="header-logo">Logo here</div>
			<div id="header-browse">Browse </div>
			<div id="header-create-recipe">Create recipe</div>
            <div id="header-see-batches">My batches</div>
            <SignIn />
            {/* <div id="header-auth">Sign in with google button here</div> */}
		</div>
	);
}
