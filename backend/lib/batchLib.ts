import { Batch, BaseBatchUpdate, TextBatchUpdate, GravityBatchUpdate, StageBatchUpdate } from "./customTypes"
import { firebaseApp, db } from "./firebaseApp"
import express from "express"

export async function firebaseInsertBatch(batch: Batch, batchID: string, collectionName: string, userID: string){

    batch.author = userID
    
    const collectionRef = db.collection(collectionName);

    await collectionRef.doc(batchID).set(batch)

}