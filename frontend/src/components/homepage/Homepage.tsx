import Auth from "../../auth/Auth";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import "./styles/homepage.css";
import Calculator from "../calculator/Calculator";
import firebase from "../../service/firebase";

function WelcomeMessage({ user }: { user: firebase.User | null }) {
	return (
		<div className="bold">
			Welcome to meadarchive{user ? " " + user.displayName : ""}!
		</div>
	);
}

function Homepage() {
	const { user } = useAuth();

	return (
		<>
			<div id="welcome-container">
				<div id="welcome">
					<WelcomeMessage user={user} />
					<div>
						Meadarchive is a passion project to create a way to
						preserve and share mead recipes and brews. It is
						currently in very early alpha version as a proof of
						concept so many features do not exist and some may be
						broken
					</div>
					<div>Take your first steps:</div>
					<ul>
						{!user && (
							<>
								<div>Sign in below</div>
								<Auth>Sign in</Auth>
							</>
						)}
						<div>
							<Link to="/recipe/create">Create a recipe</Link>
						</div>
						<div>Take notes of a batch</div>
					</ul>
				</div>
			</div>
			<Calculator />
		</>
	);
}

export default Homepage;
