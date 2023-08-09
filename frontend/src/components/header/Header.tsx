import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiSignInLight, PiSignOutLight } from "react-icons/pi";

import { useAuth } from "../../hooks/useAuth";
import SignOut from "../../auth/SignOut";
import "./styles/header.css";

export default function Header() {
	const auth = useAuth();
	const user = auth.user;
	const [copied, setCopied] = useState(false);

	const handleCopyClick = async () => {
		if (user) {
			try {
				const token = await user.getIdToken();
				await navigator.clipboard.writeText(token);
				setCopied(true);
				setTimeout(() => setCopied(false), 3000);
			} catch (error) {
				console.error("Error copying token:", error);
			}
		}
	};

	return (
		<>
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
					{user ? (
						<div id="header-sign-out">
							<SignOut />
							<PiSignOutLight />
						</div>
					) : (
						<Link to="/sign-in">
							Sign in <PiSignInLight />
						</Link>
					)}
				</div>
			</div>
			<div>
				{user &&
					(user.uid === "EGKwKPUpR3emxd6wsaW03WYXmJs1" ||
						user.uid === "MdI4Du5imwcExc7XiZvxDPwL8923" ||
						user.uid === "E7N5xAZYApd9LZyuDP4HQTOAoih1") && (
						<div>
							<button onClick={handleCopyClick}>
								Copy token
							</button>
							{copied && <div>Copied to clipboard</div>}
						</div>
					)}
			</div>
		</>
	);
}
