import { useState, useEffect } from "react";
import firebase from "../../service/firebase";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Batch, BatchWithUpdates } from "../../api/interfaces/batchInterface";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import getUserByUID from "../../api/get/getUserByUID";
import getRecipesByUID from "../../api/get/getRecipesByUID";
import getBatchesByUID from "../../api/get/getBatchesByUID";
import CountRecipes from "./CountRecipes";
import CountBatches from "./CountBatches";
import "./styles/profile.css";
import DashboardRecipe from "../dashboard/DashboardRecipe";
import { useAuth } from "../../hooks/useAuth";
import DashboardBatchInfo from "../dashboard/DashboardBatchInfo";

export default function Profile() {
	const [userInfo, setUserInfo] = useState({} as firebase.User);
	const [userRecipes, setUserRecipes] = useState([] as RecipeInterface[]);
	const [userBatches, setUserBatches] = useState([] as Batch[]);
	const { user } = useAuth();
	const params = useParams();
	const uid = params.uid ? params.uid : "";

	useEffect(() => {
		const fetchData = async () => {
			const user = await getUserByUID(uid);
			const recipes = await getRecipesByUID(uid);
			const batches = await getBatchesByUID(uid);

			setUserInfo(user.userInfo);
			setUserRecipes(recipes);
			setUserBatches(batches);
		};

		fetchData();
	}, []);

	return (
		<div>
			{userInfo && userInfo.displayName ? (
				<div className="user-info-container">
					{userInfo.photoURL && (
						<img
							referrerPolicy="no-referrer"
							src={userInfo.photoURL}
							alt={userInfo.displayName}
							className="profile-photo"
						/>
					)}
					<div className="bold-and-bigger">
						{userInfo.displayName}
					</div>
					{userRecipes && <CountRecipes userRecipes={userRecipes} />}
					{userBatches && <CountBatches userBatches={userBatches} />}
				</div>
			) : (
				<div>No user data</div>
			)}
			{userRecipes && Object.entries(userRecipes).length > 0 && (
				<div className="user-recipes-container">
					<div className="user-recipes-title bold-and-bigger">
						Recipes
					</div>
					{Object.entries(userRecipes).map(([rid, recipe]) => {
						return (
							<DashboardRecipe
								user={user}
								rid={rid}
								recipe={recipe}
							/>
						);
					})}
				</div>
			)}
			{userBatches && Object.entries(userBatches).length > 0 && (
				<>
					<div className="user-batches-title bold-and-bigger">
						Batches
					</div>
					<div className="user-batches-container">
						{Object.entries(userBatches).map(([bid, batch]) => {
							return (
								<div className="batch-with-link">
									<Link
										className="bold-link bigger"
										to={`/batch/${bid}`}
									>
										{batch.batchName}
									</Link>
									<DashboardBatchInfo
										batchInfo={batch as BatchWithUpdates}
									/>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
