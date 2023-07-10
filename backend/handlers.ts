import express from "express";
import { v4 as uuidv4 } from 'uuid';

import { config } from "./config"
import { Recipe, RecipeSchema } from "./lib/customTypes";
import { firebaseInsertRecipe, firebaseGetRecipes, firebaseDeleteRecipe, checkIfUserOwnsRecipe, checkIfRecipeExists} from "./lib/recipeLib"


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
            res.status(400).send({"error": error})
            return
        }

        // Generate uuid for the recipe
        const recipeID = uuidv4()

        await firebaseInsertRecipe(recipe, recipeID, config.recipesCollectionName, userID)

        res.status(200).send({"msg": "Authorized", "recipeID": recipeID})


    } catch (err){
        console.log(err)
        res.status(500).send({ "error": "Internal server error during creation of a recipe"});
    }
}

export async function getRecipe(req: express.Request, res: express.Response){
    try{

        const searchUserID = req.query.userID as string | null
        const searchRecipeID = req.query.recipeID as string | null

        const recipes = await firebaseGetRecipes(searchRecipeID, searchUserID, config.recipesCollectionName)


        res.status(200).send({"msg": "Authorized", "recipes": recipes})


    } catch (err){
        console.log(err)
        res.status(500).send({ "error": "Internal server error while getting the recipe"});
    }
}

export async function deleteRecipe(req: express.Request, res: express.Response){
    try{
        const userID: string = res.locals.user.uid

        if (!req.query.recipeID){
            res.status(400).send({"erorr": `Recipe ID is null or undefined`})
            return
        }

        const RecipeID = req.query.recipeID as string

        const recipeExists = await checkIfRecipeExists(RecipeID, config.recipesCollectionName)

        if(!recipeExists){
            res.status(400).send({"error": `No recipe with id '${RecipeID}' exists`})
            return
        }

        const userOwnsRecipe =  await checkIfUserOwnsRecipe(RecipeID, config.recipesCollectionName, userID)

        if (!userOwnsRecipe){
            res.status(400).send({"error": `User does not own this recipe`})
            return
        }

        await firebaseDeleteRecipe(RecipeID, config.recipesCollectionName)

        res.status(200).send({"msg": `Successfully deleted recipe with id: '${RecipeID}'`})


    } catch (err){
        console.log(err)
        res.status(500).send({ "error": `Internal server error while deleting recipe '${req.query.recipeID}'`});
    }
}  

