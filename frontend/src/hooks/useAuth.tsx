import { useCallback, useEffect, useState } from "react";
import firebase from "../service/firebase";

export const useAuth = () => {
	const [user, setUser] = useState<firebase.User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [authError, setAuthError] = useState<firebase.auth.Error | null>(
		null
	);

	const auth: firebase.auth.Auth = firebase.auth();
	const provider: firebase.auth.GoogleAuthProvider =
		new firebase.auth.GoogleAuthProvider();

	provider.setCustomParameters({ prompt: "select_account" });

	const handleUser = useCallback((user: firebase.User | null) => {
		setUser(user);
		setIsLoading(false);
	}, []);

	const signIn = (): void => {
		auth.signInWithPopup(provider)
			.then((res: firebase.auth.UserCredential): void => {
				console.log(res);
				handleUser(res.user);
			})
			.finally(
				() =>
					// redirect to homepage
					(window.location.href = "/")
			)
			.catch((error: firebase.auth.Error): void => setAuthError(error));
	};

	const signOut = (): void => {
		auth.signOut().then((): void => handleUser(null));
	};

	useEffect(() => {
		console.log("unsubscribe");
		const unsubscribe = auth.onIdTokenChanged((user) => handleUser(user));
		return () => unsubscribe();
	}, [auth, handleUser]);

	console.log(user);

	return { user, isLoading, authError, signIn, signOut };
};
