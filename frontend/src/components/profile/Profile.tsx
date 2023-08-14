import { useState, useEffect } from "react";
import firebase from "../../service/firebase";
import { useParams } from "react-router-dom";
import { Batch } from "../../api/interfaces/batchInterface";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import getUserByUID from "../../api/get/getUserByUID";
import getRecipesByUID from "../../api/get/getRecipesByUID";
import getBatchesByUID from "../../api/get/getBatchesByUID";
import CountRecipes from "./CountRecipes";
import CountBatches from "./CountBatches";
import "./styles/profile.css";

export default function Profile() {
	const [user, setUser] = useState({} as firebase.User);
	const [userRecipes, setUserRecipes] = useState([] as RecipeInterface[]);
	const [userBatches, setUserBatches] = useState([] as Batch[]);
	const params = useParams();
	const uid = params.uid ? params.uid : "";

	useEffect(() => {
		const fetchData = async () => {
			const user = await getUserByUID(uid);
			const recipes = await getRecipesByUID(uid);
			const batches = await getBatchesByUID(uid);

			setUser(user.userInfo);
			setUserRecipes(recipes);
			setUserBatches(batches);
		};

		fetchData();
	}, []);

	return (
		<div>
			{user && user.displayName ? (
				<div className="user-info-container">
					{user.photoURL && (
						<img
							src={user.photoURL}
							alt={user.displayName}
							className="profile-photo"
						/>
					)}
					<div className="bold">{user.displayName}</div>
					{userRecipes && <CountRecipes userRecipes={userRecipes} />}
					{userBatches && <CountBatches userBatches={userBatches} />}
				</div>
			) : (
				<div>No user data</div>
			)}
		</div>
	);
}
