import { Recipe } from "./customTypes"
import { firebaseApp, db } from "./firebaseApp"


export async function insertRecipe(recipe: Recipe, recipeID: string, collectionName: string){

    const collectionRef = db.collection(collectionName);
    
    await collectionRef.doc(recipeID).set(recipe)
    
}