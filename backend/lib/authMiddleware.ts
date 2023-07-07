import express from "express";
import { firebaseApp } from "./firebaseApp"

export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try{

        const tokenID = req.headers.authorization || "" ;

        try{
            const decodedToken  = await firebaseApp.auth().verifyIdToken(tokenID)

            res.locals.authorzied = true
            res.locals.user = decodedToken
        
        } catch(err){
            console.log("Token verification failed", req.path)
            res.locals.authorzied = false
            res.locals.user = null
        }

        next()

    } catch(err){
        res.status(500).json({ error: 'Internal Server Error During Auth'});
    }
    
}