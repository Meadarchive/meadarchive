import express from "express";
import { v4 as uuidv4 } from 'uuid';

import { config } from "./config"
import { Recipe, RecipeSchema } from "./lib/customTypes";
import { insertRecipe } from "./lib/recipeLib"


export async function healthStatus(req: express.Request, res: express.Response) {
    try{

        res.send({ status: "OK" });

    } catch (err){
        res.status(500).send({ "error": "Internal server error"});
    }
}

export async function createRecipe(req: express.Request, res: express.Response){
    try{

        // Extract user uid and recipe data
        const userID: string = res.locals.user.uid
        const recipe: Recipe = req.body

        // Validate recipe schema
        try{
            RecipeSchema.parse(recipe);
        } catch (error){
            res.status(500).send({"error": error})
            return
        }

        // Generate uuid for the recipe
        const recipeID = uuidv4()

        await insertRecipe(recipe, recipeID, config.recipesCollectionName, userID)

        res.status(200).send({"msg": "Authorized", "recipeID": recipeID})


    } catch (err){
        res.status(500).send({ "error": "Internal server error during creation of a recipe"});
    }
}