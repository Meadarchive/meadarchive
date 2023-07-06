import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Homepage from "../homepage/Homepage";
import Profile from "../profile/Profile";
import RecipeEdit from "../recipe/Edit";
import RecipeView from "../recipe/View";
import RecipeCreate from "../recipe/Create";
import BatchCreate from "../batch/Create";
import BatchEdit from "../batch/Create";
import BatchView from "../batch/Create";
import NoPath from "../nopath/NoPath";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/profile/:uid" element={<Profile />} />
				<Route path="/recipie/:rid" element={<RecipeView />} />
				<Route path="/recipie/:rid/edit" element={<RecipeEdit />} />
				<Route path="/recipie/:rid/create" element={<RecipeCreate />} />
				<Route path="/batch/:rid" element={<BatchView />} />
				<Route path="/batch/:rid/edit" element={<BatchEdit />} />
				<Route path="/batch/:rid/create" element={<BatchCreate />} />
				<Route path="*" element={<NoPath />} />
			</Routes>
		</BrowserRouter>
	);
}
