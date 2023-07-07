export interface Options {
	method: string;
	headers: {
		accept: string;
		authorization: string;
	};
}

import firebase from "../service/firebase";

export function setOptions(user: firebase.User | null) {
	let options: Options = {
		method: "GET",
		headers: {
			accept: "application/json",
			authorization: `${user?.getIdToken()}`,
		},
	};
	return options;
}
