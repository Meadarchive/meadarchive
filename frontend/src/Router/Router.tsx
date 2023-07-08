import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Homepage from "../components/homepage/Homepage";
import Profile from "../components/profile/Profile";
import RecipeEdit from "../components/recipe/edit/Edit";
import RecipeView from "../components/recipe/view/View";
import RecipeCreate from "../components/recipe/create/Create";
import BatchCreate from "../components/batch/Create";
import BatchEdit from "../components/batch/Create";
import BatchView from "../components/batch/Create";
import NoPath from "../components/nopath/NoPath";
import Header from "../components/header/Header";
import PrivateRoute from "./PrivateRoute";

export default function Router() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Homepage />} />
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
					<Route path="/batch/:rid" element={<BatchView />} />
					<Route
						path="/batch/:rid/edit"
						element={
							<PrivateRoute>
								<BatchEdit />
							</PrivateRoute>
						}
					/>
					<Route
						path="/batch/create"
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
