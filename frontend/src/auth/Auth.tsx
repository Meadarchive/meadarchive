import React from "react";
import { useAuth } from "../hooks/useAuth";
import GoogleButton from "react-google-button";

interface AuthProps {
	children: React.ReactNode;
}

function Auth({ children }: AuthProps): JSX.Element {
	const { signIn } = useAuth();

	const handleSignIn = () => {
		signIn();
	};

	return (
		<div>
			<GoogleButton type="dark" onClick={handleSignIn}>
				{children}
			</GoogleButton>
		</div>
	);
}

export default Auth;
