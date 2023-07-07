import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
	children: Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children: Element }) => {
	const auth = useAuth();
	const isAuthenticated = auth.user !== null;

	return isAuthenticated ? <>{Element}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;
