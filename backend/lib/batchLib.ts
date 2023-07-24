import { Batch, BaseBatchUpdate, TextBatchUpdate, GravityBatchUpdate, StageBatchUpdate } from "./customTypes"
import { firebaseApp, db } from "./firebaseApp"

export async function firebaseInsertBatch(batch: Batch, batchID: string, collectionName: string, userID: string){

    batch.author = userID
    
    const collectionRef = db.collection(collectionName);

    await collectionRef.doc(batchID).set(batch)
}

export async function checkIfBatchExists(batchID: string, collectionName: string){

    const docRef = db.collection(collectionName).doc(batchID)

    const doc = await docRef.get()

    return doc.exists
}

export async function firebaseInsertBatchUpdate(batchUpdate: BaseBatchUpdate, updateID: string, collectionName: string){
    const updateType = batchUpdate.updateType

    if (updateType == "text"){
        const update = batchUpdate as TextBatchUpdate
        await firebaseInsertBatchTextUpdate(update, updateID, collectionName)
        
    } else if (updateType == "gravity"){
        const update = batchUpdate as GravityBatchUpdate
        await firebaseInsertBatchGravityUpdate(update, updateID, collectionName)

    } else if (updateType == "stage"){
        const update = batchUpdate as StageBatchUpdate
        await firebaseInsertBatchStageUpdate(update, updateID, collectionName)

    } else {
        throw new Error(`Invalid update type '${updateType}'`)
    }

}

async function firebaseInsertBatchTextUpdate(batchUpdate: TextBatchUpdate, updateID: string, collectionName: string){
    const batchID = batchUpdate.batchID
    const collectionRef = db.collection(collectionName);

    await collectionRef.doc(batchID).collection("updates").doc(updateID).set(batchUpdate)
}

async function firebaseInsertBatchGravityUpdate(batchUpdate: GravityBatchUpdate, updateID: string, collectionName: string){
    const batchID = batchUpdate.batchID
    const collectionRef = db.collection(collectionName);

    await collectionRef.doc(batchID).collection("updates").doc(updateID).set(batchUpdate)
}

async function firebaseInsertBatchStageUpdate(batchUpdate: StageBatchUpdate, updateID: string, collectionName: string){
    const batchID = batchUpdate.batchID
    const collectionRef = db.collection(collectionName);

    await collectionRef.doc(batchID).collection("updates").doc(updateID).set(batchUpdate)

    await collectionRef.doc(batchID).update({stage: batchUpdate.newStage})
}

export async function firebaseGetBatches(batchID: string | null, userID: string | null, collectionName: string){
    const collectionRef = db.collection(collectionName);
    let batches: { [key: string]: any } = {};

    // Select all unless userid or batch id are passed
    if (batchID){
        let queryRef = collectionRef.doc(batchID)
        let batchDoc = await queryRef.get()

        batches[batchDoc.id] = batchDoc.data()

        // Get list of updates from collection updates
        let updatesRef = queryRef.collection("updates").orderBy("updateDate", "asc")
        let updates = await updatesRef.get()

        batches[batchDoc.id].updates = {}

        updates.forEach((doc: { id: string; data: () => any; }) => {
            batches[batchDoc.id].updates[doc.id] = doc.data()
        });

    } else {
        let queryRef;

        if (userID ){
            queryRef = collectionRef.where('author', "==", userID as string)

        } else{
            queryRef = collectionRef
        }

        let queryResult = await queryRef.get();

        queryResult.forEach((doc: { id: string; data: () => any; }) => {
            batches[doc.id] = doc.data()
        });

        // Get list of updates from collection updates
        for (const batchID in batches){
            let updatesRef = collectionRef.doc(batchID).collection("updates").orderBy("updateDate", "asc")
            let updates = await updatesRef.get()

            batches[batchID].updates = {}

            updates.forEach((doc: { id: string; data: () => any; }) => {
                batches[batchID].updates[doc.id] = doc.data()
            });
        }
    }

    return batches

}

export async function checkIfUserOwnsBatch(batchID: string, collectionName: string, userID: string, ){
    const docRef = db.collection(collectionName).doc(batchID)

    const doc = await docRef.get()

    const batch = doc.data()

    const owner = batch ? batch.author : null;

    if (owner && owner == userID){
        return true
    }

    return false
}

export async function firebaseDeleteBatch(batchID: string, collectionName: string){
    const docRef = db.collection(collectionName).doc(batchID)

    await docRef.delete()
}

export async function checkIfUpdateExits(batchID: string, updateID: string, collectionName: string){
    const docRef = db.collection(collectionName).doc(batchID).collection("updates").doc(updateID)

    const doc = await docRef.get()

    return doc.exists
}

export async function firebaseDeleteBatchUpdate(batchID: string, updateID: string, collectionName: string){
    const docRef = db.collection(collectionName).doc(batchID).collection("updates").doc(updateID)

    await docRef.delete()
}

export async function firebaseGetBatchUpdate(batchID: string | null, updateID:string | null, collectionName: string){
    if (!batchID || !updateID){
        return {}
    }

    const docRef = db.collection(collectionName).doc(batchID).collection("updates").doc(updateID)
    const doc = await docRef.get()
    return doc.data()

}