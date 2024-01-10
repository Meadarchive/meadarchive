import { Batch } from "../../api/interfaces/batchInterface";

const CountBatches = ({ userBatches }: { userBatches: Batch[] }) => {
	const batchCount = Object.entries(userBatches).length;

	if (batchCount === 1) {
		return <div>1 batch</div>;
	} else if (batchCount > 1) {
		return <div>{batchCount} Batches</div>;
	} else {
		return <div>No Batches</div>;
	}
};

export default CountBatches;
