import dotenv from "dotenv"

// Import env vars from the .env file
dotenv.config()

export interface Config {
    port: number,
    run_mode: string,
    firebase_creds_file: string,
    namespace: string,
    project_name: string,
    test_user_id: string,
    recipesCollectionName: string,
    batchesCollectionName: string
}

export let config: Config = {
    port: process.env.PORT as unknown as number,
    run_mode: process.env.RUN_MODE as string,
    firebase_creds_file: process.env.FIREBASE_CREDS_PATH as string,
    namespace: process.env.NAMESPACE as string, 
    project_name: process.env.PROJECT_NAME as string,
    test_user_id: process.env.TEST_USER_ID as string,
    recipesCollectionName: `${process.env.NAMESPACE}-recipes`,
    batchesCollectionName: `${process.env.NAMESPACE}-batches`
};