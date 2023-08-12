import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../service/firebase";

export const useAuth = () => {
	const [user, setUser] = useState<firebase.User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [authError, setAuthError] = useState<firebase.auth.Error | null>(
		null
	);

	const navigate = useNavigate();

	const auth = firebase.auth();
	const provider = new firebase.auth.GoogleAuthProvider();
	provider.setCustomParameters({ prompt: "select_account" });

	const handleUser = (user: firebase.User | null) => {
		setUser(user);
		setIsLoading(false);
	};

	const signIn = async () => {
		try {
			const res = await auth.signInWithPopup(provider);
			handleUser(res.user);
			navigate("/");
		} catch (error) {
			setAuthError(error as firebase.auth.Error);
		}
	};

	const signOut = async () => {
		try {
			await auth.signOut();
			handleUser(null);
		} catch (error) {
			setAuthError(error as firebase.auth.Error);
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onIdTokenChanged(handleUser);
		return () => unsubscribe();
	}, [auth]);

	return { user, isLoading, authError, signIn, signOut };
};
