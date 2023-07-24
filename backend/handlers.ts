import express from "express";

import { config } from "./config"
import { Recipe, RecipeSchema, Batch, BatchSchema, BaseBatchUpdate, TextBatchUpdate, GravityBatchUpdate, StageBatchUpdate, TextBatchUpdateSchema, GravityBatchUpdateSchema, StageBatchUpdateSchema} from "./lib/customTypes";
import { firebaseInsertRecipe, firebaseGetRecipes, firebaseDeleteRecipe, checkIfUserOwnsRecipe, checkIfRecipeExists} from "./lib/recipeLib"
import { firebaseInsertBatch, firebaseInsertBatchUpdate, checkIfBatchExists, firebaseGetBatches, checkIfUserOwnsBatch, firebaseDeleteBatch} from "./lib/batchLib"
import { genUID } from "./lib/util"

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
        const recipeID: string = await genUID()

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

        if (!req.body.recipeID){
            res.status(400).send({"error": `Recipe ID is null or undefined`})
            return
        }

        const RecipeID = req.body.recipeID as string

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

export async function createBatch(req: express.Request, res: express.Response){
    try{
        // Extract user uid and batch data
        const userID: string = res.locals.user.uid
        const batch: Batch = req.body

        // Validate recipe schema
        try{
            BatchSchema.parse(batch)
        } catch (error){
            res.status(400).send({"error": error})
            return
        }

        // Check if recipe the batch is based on exists
        const recipeExists = await checkIfRecipeExists(batch.recipeID, config.recipesCollectionName)

        if(!recipeExists){
            res.status(400).send({"error": `No recipe with id '${batch.recipeID}' exists`})
            return
        }

        const batchUID: string = await genUID()

        await firebaseInsertBatch(batch, batchUID, config.batchesCollectionName, userID)

        res.status(200).send({"msg": "Authorized", "batchID": batchUID})

    } catch (err){
        console.log(err)
        res.status(500).send({ "error": `Internal server error while creating batch`});

    }
}

export async function createBatchUpdate(req: express.Request, res: express.Response){
    try{
        const userID: string = res.locals.user.uid
        let batchUpdate = req.body as BaseBatchUpdate
        let schema;

        const batchExists = await checkIfBatchExists(batchUpdate.batchID, config.batchesCollectionName)

        if (!batchExists){
            res.status(400).send({"error": `No batch with id '${batchUpdate.batchID}' exists`})
            return
        }

        // Indentify the type of update
        if (batchUpdate.updateType == "text"){
            batchUpdate = req.body as TextBatchUpdate
            schema = TextBatchUpdateSchema

        } else if (batchUpdate.updateType == "gravity"){
            batchUpdate = req.body as GravityBatchUpdate
            schema = GravityBatchUpdateSchema

        } else if (batchUpdate.updateType == "stage"){
            batchUpdate = req.body as StageBatchUpdate
            schema = StageBatchUpdateSchema

        } else {
            res.status(400).send({"error": `Invalid update type '${batchUpdate.updateType}'`})
            return
        }

        // Validate the schema
        try{
            schema.parse(batchUpdate)
        }
        catch (error){
            res.status(400).send({"error": error})
            return
        }

        const updateUID: string = await genUID()

        await firebaseInsertBatchUpdate(batchUpdate, updateUID, config.batchesCollectionName)

        res.status(200).send({"msg": "Authorized", "UpdateUID": updateUID})

    } catch (err){
        console.log(err)
        res.status(500).send({ "error": `Internal server error while creating a batch update`});
    }
}

export async function getBatch(req: express.Request, res: express.Response){
    try{
        const searchUserID = req.query.userID as string | null
        const searchBatchID = req.query.batchID as string | null

        const batches = await firebaseGetBatches(searchBatchID, searchUserID, config.batchesCollectionName)


        res.status(200).send({"msg": "Authorized", "batches": batches})

    } catch (err){
        console.log(err)
        res.status(500).send({ "error": `Internal server error while getting batch. (BatchID: '${req.query.batchID}', UserID: '${req.query.userID}')`});
    }
}

export async function deleteBatch(req: express.Request, res: express.Response){
    try{
        const userID: string = res.locals.user.uid

        if (!req.body.batchID){
            res.status(400).send({"error": `Batch ID is null or undefined`})
            return
        }

        const batchID = req.body.batchID as string

        const batchExists = await checkIfBatchExists(batchID, config.batchesCollectionName)

        if(!batchExists){
            res.status(400).send({"error": `No batch with id '${batchID}' exists`})
            return
        }

        const userOwnsBatch =  await checkIfUserOwnsBatch(batchID, config.batchesCollectionName, userID)

        if (!userOwnsBatch){
            res.status(400).send({"error": `User does not own this batch`})
            return
        }

        await firebaseDeleteBatch(batchID, config.batchesCollectionName)

        res.status(200).send({"msg": `Successfully deleted batch with id: '${batchID}'`})

    } catch (err){
        console.log(err)
        res.status(500).send({ "error": `Internal server error while deleting batch '${req.query.batchID}'`});
    }
}

