import dotenv from "dotenv"

// Import env vars from the .env file
dotenv.config()

export interface Config {
    port: number,
    RUN_MODE: string
}

export let config: Config = {
    port: process.env.PORT as unknown as number,
    RUN_MODE: process.env.RUN_MODE as string
};