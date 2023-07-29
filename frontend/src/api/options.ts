export interface Options {
	method: string;
	headers: {
		accept: string;
		authorization: string;
		'Content-Type': string;
	};
	body: string;
}

import CreateFormState from "../components/recipe/create/interfaces/CreateFormState";
import firebase from "../service/firebase";

export async function getCreateRecipeOptions(user: firebase.User | null, body: CreateFormState) {
	let options: Options = {
		method: "POST",
		headers: {
			accept: "application/json",
			authorization: `${await user?.getIdToken()}`,
   		 	'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
	};
	return options;
}

export async function getDeleteRecipeOptions(user: firebase.User | null, rid: string) {
	console.log(rid)
	let options: Options = {
		method: "POST",
		headers: {
			accept: "application/json",
			authorization: `${await user?.getIdToken()}`,
   		 	'Content-Type': 'application/json'
		},
		body: JSON.stringify({ recipeID: rid }),
	};
	return options;
}

export async function getDeleteBatchOptions(user: firebase.User | null, bid: string) {
	console.log(bid)
	let options: Options = {
		method: "POST",
		headers: {
			accept: "application/json",
			authorization: `${await user?.getIdToken()}`,
   		 	'Content-Type': 'application/json'
		},
		body: JSON.stringify({ batchID: bid }),
	};
	return options;
}

export async function getCreateBatchOptions(user: firebase.User | null, body: any) {
	let options: Options = {
		method: "POST",
		headers: {
			accept: "application/json",
			authorization: `${await user?.getIdToken()}`,
   		 	'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
	};
	return options;
}

export async function getCreateBatchUpdateOptions(user: firebase.User | null, bid: string, update: any) {
	let options: Options = {
		method: "POST",
		headers: {
			accept: "application/json",
			authorization: `${await user?.getIdToken()}`,
   		 	'Content-Type': 'application/json'
		},
		body: JSON.stringify(update),
	};
	return options;
}