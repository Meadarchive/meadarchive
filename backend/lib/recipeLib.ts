import { Recipe } from "./customTypes"
import { firebaseApp, db } from "./firebaseApp"


export async function insertRecipe(recipe: Recipe, recipeID: string, collectionName: string, userID: string){

    const collectionRef = db.collection(collectionName);

    recipe.author = userID
    
    await collectionRef.doc(recipeID).set(recipe)
    
}