import express from "express";

export async function healthStatus(req: express.Request, res: express.Response) {
    try{

        res.send({ status: "OK" });

    } catch (err){
        res.status(500).send({ "error": "Internal server error"});
    }
}

export async function createRecipe(req: express.Request, res: express.Response){
    try{

        console.log(res.locals.user)
        
        res.status(200).send({"msg": "Authorized"})


    } catch (err){
        res.status(500).send({ "error": "Internal server error during creation of a recipe"});
    }
}