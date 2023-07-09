import { firebaseApp, db } from "./firebaseApp"

export async function genUserAuthToken(uuid: string){
    return firebaseApp.auth().createCustomToken(uuid)
}
