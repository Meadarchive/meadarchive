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

export async function getOptions(user: firebase.User | null, body: CreateFormState) {
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
