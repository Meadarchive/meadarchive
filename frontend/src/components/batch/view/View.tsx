import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getBatchByBID from "../../../api/get/getBatchByBID";
import { BatchWithUpdates } from "../../../api/interfaces/batchInterface";
import UpdatesContainer from "./UpdatesContainer";
import BatchInfo from "./BatchInfo";
import EquipmentList from "./EquipmentList";
import "./styles/view.css";

interface Params {
	bid?: string;
}

export default function View() {
	const { bid = "" } = useParams<Params>();
	const navigate = useNavigate();

	const [batchInfo, setBatchInfo] = useState<BatchWithUpdates | null>(null);

	useEffect(() => {
		const fetchBatchInfo = async () => {
			console.log(`Fetching batch info for ${bid}`);
			const recipeInfo = await getBatchByBID(bid);
			setBatchInfo(recipeInfo);
		};

		fetchBatchInfo();
	}, [bid]);

	const renderBatchInfo = () => (
		<>
			<div id="batch-created-title">Batch Created</div>
			<div className="starting-container">
				<BatchInfo batchInfo={batchInfo!} />
				<EquipmentList equipment={batchInfo!.equipment} />
			</div>
		</>
	);

	return (
		<div id="view-batch-container">
			{batchInfo && renderBatchInfo()}

			<UpdatesContainer batchInfo={batchInfo} />

			<button
				onClick={() => navigate(`/batch/update/${bid}`)}
				id="add-update-button"
			>
				Add Update
			</button>
		</div>
	);
}
