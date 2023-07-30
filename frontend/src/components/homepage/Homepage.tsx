import Auth from "../../auth/Auth";
import { useAuth } from "../../hooks/useAuth";
import "./styles/homepage.css";
import { Link } from "react-router-dom";

export default function Homepage() {
	const { user } = useAuth();
	return (
		<div id="welcome-container">
			<div id="welcome">
				{user ? (
					<div>Welcome to meadarchive {user.displayName}!</div>
				) : (
					<div>Welcome to meadarchive!</div>
				)}
				<div>
					Meadarchive is project to create a way to preserve and share
					mead recipes and brews. It is currently in very early alpha
					version as a proof of concept so many features do not exist
					and some may be broken
				</div>
				<div>Take your first steps:</div>
				<ul>
					{!user && (
						<>
							<li>Sign in below</li>
						</>
					)}
					{!user && <Auth>Sign in </Auth>}
					<li>
						<Link to="/recipe/create">Create a recipe</Link>
					</li>
					<li>Take notes of a batch</li>
				</ul>
			</div>
		</div>
	);
}
