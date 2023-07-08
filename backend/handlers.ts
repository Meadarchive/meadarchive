import express from "express";
import { v4 as uuidv4 } from 'uuid';

export async function healthStatus(req: express.Request, res: express.Response) {
    try{

        res.send({ status: "OK" });

    } catch (err){
        res.status(500).send({ "error": "Internal server error"});
    }
}

export async function createRecipe(req: express.Request, res: express.Response){
    try{

        //console.log(res.locals.user)
        console.log(req.body)

        const uid = res.locals.user.uid
        const recipe = req.body

        const recipeID = uuidv4()



        
        res.status(200).send({"msg": "Authorized", "recipeID":recipeID})


    } catch (err){
        res.status(500).send({ "error": "Internal server error during creation of a recipe"});
    }
}