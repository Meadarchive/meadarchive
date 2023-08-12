import { BatchWithUpdates } from "../interfaces/batchInterface";

export default async function getBatchByBID(uid: string): Promise<BatchWithUpdates[]> {
    const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/batch?userID=${uid}`
    );
    const data = await res.json();
    const batches = data.batches
    return batches;
}