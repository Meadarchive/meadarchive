import express from "express";

export async function restrictAccessMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try{

        if (!res.locals.authorzied){
            res.status(401).json({ error: 'Not Authorized' });
            return
        }
    

        next()

    } catch(err){
        res.status(500).json({ error: 'Internal Server Error During Acess Verification' });
    }
    
}