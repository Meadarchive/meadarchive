import { config } from "../config";
import { genUserAuthToken } from "../lib/util";

async function getUserAuthToken(){
    console.log("Requesting...")
    const authToken = await genUserAuthToken(config.test_user_id)
    console.log(authToken)
}

getUserAuthToken()
