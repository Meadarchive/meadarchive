import { firebaseApp } from "./firebaseApp"

export async function genUserAuthToken(uuid: string){
    return await firebaseApp.auth().createCustomToken(uuid)
}
