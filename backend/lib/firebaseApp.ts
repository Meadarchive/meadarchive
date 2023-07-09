import admin from "firebase-admin"
import { config } from "../config";


const serviceAccount = require(config.firebase_creds_file);

export const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${config.project_name}.firebaseio.com`

})

export const db = firebaseApp.firestore()


 
