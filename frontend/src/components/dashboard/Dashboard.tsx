import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import DashboardRecipe from "./DashboardRecipe";
import DashboardBatchInfo from "./DashboardBatchInfo";
import DeleteConfirmation from "../recipe/view/DeleteConfirmation";
import firebase from "../../service/firebase";
import { BatchWithUpdates } from "../../api/interfaces/batchInterface";
import getRecipesByUID from "../../api/get/getRecipesByUID";
import getBatchesByUID from "../../api/get/getBatchesByUID";
import deleteBatch from "../../api/delete/deleteBatch";
import "./styles/dashboard.css";
import "../batch/view/styles/view.css";

function Dashboard() {
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleDeleteBatch = async (
		bid: string,
		user: firebase.User | null
	) => {
		if (user) {
			const navigateUrl = await deleteBatch(bid, user);
			navigate(navigateUrl);
		}
	};

	const [recipes, setRecipes] = useState<RecipeInterface[] | null>(null);
	const [batches, setBatches] = useState<BatchWithUpdates[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				const userRecipes = await getRecipesByUID(user.uid);
				const userBatches = await getBatchesByUID(user.uid);
				setRecipes(userRecipes);
				setBatches(userBatches);
			}
		};

		fetchData();
	}, [user]);

	const scrollToRecipes = () => {
		const recipesTitleElement = document.getElementById("recipes-title");
		if (recipesTitleElement) {
			recipesTitleElement.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div>
			<div id="dashboard">
				<h2 id="recipes-title">My recipes</h2>
				{recipes ? (
					<>
						{Object.keys(recipes).length !== 0 ? (
							<div id="dashboard-recipes-container">
								{Object.entries(recipes).map(
									([rid, recipe]) => (
										<DashboardRecipe
											key={rid}
											rid={rid}
											recipe={recipe}
											user={user}
										/>
									)
								)}
							</div>
						) : (
							<div className="no-recipes">
								No recipes, browse our collection of{" "}
								<Link className="bold" to="/browse">
									community made recipes
								</Link>{" "}
								or{" "}
								<Link className="bold" to="/recipe/create">
									create your own
								</Link>
							</div>
						)}
					</>
				) : (
					<LoadingSpinner />
				)}
				<h2 id="batches-title">My batches</h2>
				{batches ? (
					<div id="dashboard-batches-container">
						{Object.keys(batches).length !== 0 ? (
							<>
								{Object.entries(batches).map(([key, batch]) => (
									<div key={key} className="dashboard-batch">
										<div className="batch-container">
											<Link
												className="bold-link bigger"
												to={`/batch/${key}`}
											>
												{batch.batchName || "test"}
											</Link>
											<DashboardBatchInfo
												batchInfo={batch}
											/>
										</div>
										<div className="dashboard-delete-batch">
											<DeleteConfirmation
												whatIsBeingDeleted="batch"
												onConfirm={() => {
													handleDeleteBatch(
														key,
														user
													);
												}}
											/>
										</div>
									</div>
								))}
							</>
						) : (
							<div className="no-batches">
								No batches,{" "}
								{recipes && Object.keys(recipes).length > 0 && (
									<>
										<span
											className="bold link"
											onClick={scrollToRecipes}
										>
											create a batch
										</span>{" "}
										of one of your recipes or
									</>
								)}{" "}
								create one from our collection of{" "}
								<Link className="bold" to="/browse">
									community made recipes
								</Link>
							</div>
						)}
					</div>
				) : (
					<LoadingSpinner />
				)}
			</div>
		</div>
	);
}

export default Dashboard;
