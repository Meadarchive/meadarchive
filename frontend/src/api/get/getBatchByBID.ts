import { BatchWithUpdates } from "../interfaces/batchInterface";

export default async function getBatchByBID(bid: string): Promise<BatchWithUpdates> {
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/batch?batchID=${bid}`
	);
	const data = await res.json();
    const batch = data.batches[bid]
    return batch;
}
