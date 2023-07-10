import { Recipe} from "./customTypes"
import { firebaseApp, db } from "./firebaseApp"



export async function firebaseInsertRecipe(recipe: Recipe, recipeID: string, collectionName: string, userID: string){

    const collectionRef = db.collection(collectionName);

    recipe.author = userID
    
    await collectionRef.doc(recipeID).set(recipe)
    
}

export async function firebaseGetRecipes(recipeID: string | null, userID: string | null, collectionName: string){
    const collectionRef = db.collection(collectionName);
    let recipes: { [key: string]: any } = {};
    
    // Select all unless userid or recipe id are passed
    if (recipeID){
        let queryRef = collectionRef.doc(recipeID)
        let recipeDoc = await queryRef.get()

        recipes[recipeDoc.id] = recipeDoc.data()

    } else {
        let queryRef;

        if (userID ){
            queryRef = collectionRef.where('author', "==", userID as string)

        } else{
            queryRef = collectionRef
        }

        const snapshot = await queryRef.get();

        snapshot.forEach((doc: { id: string; data: () => any; }) => {
            recipes[doc.id] = doc.data()
        });
    }

    

    return recipes

}

export async function firebaseDeleteRecipe(recipeID: string, collectionName: string){
    const docRef = db.collection(collectionName).doc(recipeID)
    const doc = await docRef.get();

    if (doc.exists){
        await docRef.delete()
        return true
    } 

    return false


}