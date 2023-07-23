import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/loading-spinner/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children: Element }) => {
	const auth = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	let isAuthenticated = !isLoading && auth.user !== null;

	useEffect(() => {
		const checkAuthentication = async () => {
			if (auth.isLoading) {
				// Wait for the loading state to be false
				await new Promise((resolve) => setTimeout(resolve, 200));
				checkAuthentication();
			} else {
				setIsLoading(false);
			}
		};

		checkAuthentication();
	}, [auth.isLoading]);

	if (isLoading) {
		// Render a loading indicator or skeleton screen while waiting for authentication
		return <LoadingSpinner />;
	}

	return isAuthenticated ? <>{Element}</> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
