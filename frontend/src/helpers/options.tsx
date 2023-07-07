export interface Options {
	method: string;
	headers: {
		accept: string;
		authorization: string;
	};
}

// template for fetch request
// eslint-disable-next-line prefer-const
export let options: Options = {
	method: "GET",
	headers: {
		accept: "application/json",
		authorization: `key`,
	},
};
