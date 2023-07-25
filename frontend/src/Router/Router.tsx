import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Homepage from "../components/homepage/Homepage";
import Profile from "../components/profile/Profile";
import RecipeEdit from "../components/recipe/edit/Edit";
import RecipeView from "../components/recipe/view/View";
import RecipeCreate from "../components/recipe/create/Create";
import BatchCreate from "../components/batch/create/Create";
import BatchEdit from "../components/batch/Edit";
import BatchView from "../components/batch/view/View";
import NoPath from "../components/nopath/NoPath";
import Header from "../components/header/Header";
import PrivateRoute from "./PrivateRoute";
import SignInPage from "../components/sign-in/SignInPage";

export default function Router() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/sign-in" element={<SignInPage />} />
					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route path="/profile/:uid" element={<Profile />} />
					<Route path="/recipe/:rid" element={<RecipeView />} />
					<Route
						path="/recipe/:rid/edit"
						element={
							<PrivateRoute>
								<RecipeEdit />
							</PrivateRoute>
						}
					/>
					<Route
						path="/recipe/create"
						element={
							<PrivateRoute>
								<RecipeCreate />
							</PrivateRoute>
						}
					/>
					<Route path="/batch/:bid" element={<BatchView />} />
					<Route
						path="/batch/:bid/edit"
						element={
							<PrivateRoute>
								<BatchEdit />
							</PrivateRoute>
						}
					/>
					<Route
						path="/batch/create/:rid"
						element={
							<PrivateRoute>
								<BatchCreate />
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<NoPath />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
