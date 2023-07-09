import { Link } from "react-router-dom";
import SignOut from "../../auth/SignOut";
import { useAuth } from "../../hooks/useAuth";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiSignInLight, PiSignOutLight } from "react-icons/pi";
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
					Browse <AiOutlineSearch />
				</Link>
				<Link to="/recipe/create" id="header-create-recipe">
					Create recipe <IoCreateOutline />
				</Link>
				<Link to="dashboard" id="header-see-batches">
					My dashboard <LuLayoutDashboard />
				</Link>
				{user ? <div><SignOut /><PiSignOutLight /></div> : <Link to="/sign-in">Sign in <PiSignInLight /></Link>}
			</div>
		</div>
	);
}
