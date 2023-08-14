import { useState, useEffect } from "react";
import firebase from "../../service/firebase";
import { useParams } from "react-router-dom";
import { Batch } from "../../api/interfaces/batchInterface";
import RecipeInterface from "../recipe/view/interfaces/RecipeInterface";
import getUserByUID from "../../api/get/getUserByUID";
import getRecipesByUID from "../../api/get/getRecipesByUID";
import getBatchesByUID from "../../api/get/getBatchesByUID";
import CountRecipes from "./CountRecipes";

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
	

	useEffect(() => {
		console.log(user);
		console.log(userRecipes);
		console.log(userBatches);
	}, [user, userRecipes, userBatches]);

	return (
		<div>
			{user && user.displayName ? (
				<>
					<div>{user.displayName}</div>
					{userRecipes && <CountRecipes userRecipes={userRecipes} />}
					{userBatches && <div>{userBatches.length} batches</div>}
				</>
			) : (
				<div>No user data</div>
			)}
			{userRecipes && Object.entries(userRecipes).length > 0 ? (
				<h2>Recipes</h2>
			) : (
				<></>
			)}
			{userRecipes && Object.entries(userRecipes).length > 0 ? (
				Object.entries(userRecipes).map(([_, recipe], index) => {
					return (
						<div key={index}>
							<h3>{recipe.recipeName}</h3>
							<p>{recipe.recipeDescription}</p>
						</div>
					);
				})
			) : (
				<div>No recipe data</div>
			)}
			{userBatches && userBatches.length > 0 ? <h2>Batches</h2> : <></>}
			{userBatches && Object.entries(userBatches).length > 0 ? (
				Object.entries(userBatches).map(([_, batch], index) => {
					console.log(batch);
					return (
						<div key={index}>
							<h3>{batch.batchName}</h3>
							<p>{batch.dateStarted}</p>
						</div>
					);
				})
			) : (
				<div>No batch data</div>
			)}
		</div>
	);
}
