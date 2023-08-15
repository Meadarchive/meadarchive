import type { Config } from "jest";

const config: Config = {
	verbose: true,
	setupFilesAfterEnv: ["./support/setupTests.js"],
};

export default config;
