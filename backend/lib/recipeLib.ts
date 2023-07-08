import { v5 as uuidv5 } from 'uuid';

export async function genRecipeID(recipeName: string, uid: string){
    const dateNow = Date.now()

    return uuidv5(`${dateNow}:${recipeName}`, uuidv5.URL)

}