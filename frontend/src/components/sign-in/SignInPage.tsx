import SignIn from "../../auth/SignIn";
import "./styles/sign-in-page.css";

export default function SignInPage() {
	return (
		<div id="sign-in-page-container">
            <div id="sign-in-page-title">Sign In</div>
			<SignIn />
		</div>
	);
}
