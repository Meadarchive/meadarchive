import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/loading-spinner/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const auth = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuthentication = async () => {
			if (auth.isLoading) {
				await new Promise((resolve) => setTimeout(resolve, 200));
				checkAuthentication();
			} else {
				setIsLoading(false);
			}
		};

		checkAuthentication();
	}, [auth.isLoading]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	const isAuthenticated = !isLoading && auth.user !== null;
	if (isAuthenticated) {
		return <>{children}</>;
	} else {
		return <Navigate to="/sign-in" replace />;
	}
};

export default PrivateRoute;
