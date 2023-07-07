import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Homepage from "../homepage/Homepage";
import Profile from "../profile/Profile";
import RecipeEdit from "../recipe/edit/Edit";
import RecipeView from "../recipe/view/View";
import RecipeCreate from "../recipe/create/Create";
import BatchCreate from "../batch/Create";
import BatchEdit from "../batch/Create";
import BatchView from "../batch/Create";
import NoPath from "../nopath/NoPath";
import Header from "../header/Header";

export default function Router() {
	return (
		<>
			<Header />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/profile/:uid" element={<Profile />} />
					<Route path="/recipe/:rid" element={<RecipeView />} />
					<Route path="/recipe/:rid/edit" element={<RecipeEdit />} />
					<Route path="/recipe/create" element={<RecipeCreate />} />
					<Route path="/batch/:rid" element={<BatchView />} />
					<Route path="/batch/:rid/edit" element={<BatchEdit />} />
					<Route path="/batch/create" element={<BatchCreate />} />
					<Route path="*" element={<NoPath />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
