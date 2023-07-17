import { v4 as uuidv4 } from 'uuid';
import { firebaseApp, db } from "./firebaseApp"


export async function genUserAuthToken(uuid: string){
    return firebaseApp.auth().createCustomToken(uuid)
}

export async function genUID(){
    // Wraper function. //
    // More complext functionality in the future //

    const uuid = uuidv4()

    return uuid
}
