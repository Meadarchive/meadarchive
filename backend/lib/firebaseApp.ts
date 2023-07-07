import admin from "firebase-admin"
import { config } from "../config";


const serviceAccount = require(config.firebase_creds_file);

export var firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${config.project_name}.firebaseio.com`

})


 
