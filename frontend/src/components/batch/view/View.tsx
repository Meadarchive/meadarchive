import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getBatchByBID from "../../../api/get/getBatchByBID";
import { BatchWithUpdates } from "../../../api/interfaces/batchInterface";
import UpdatesContainer from "./UpdatesContainer";
import BatchInfo from "./BatchInfo";
import EquipmentList from "./EquipmentList";
import "./styles/view.css";

export default function View() {
	const params = useParams<{ bid?: string }>();
	const bid = params.bid || "";
	const navigate = useNavigate();

	const [batchInfo, setBatchInfo] = useState<BatchWithUpdates | null>(null);

	useEffect(() => {
		const fetchBatchInfo = async () => {
			console.log("fetching batch info for " + bid);
			const recipeInfo = await getBatchByBID(bid);
			setBatchInfo(recipeInfo);
		};

		fetchBatchInfo();
	}, [bid]);

	return (
		<div id="view-batch-container">
			{batchInfo && (
				<>
					<div id="batch-created-title">Batch Created</div>
					<div id="starting-container">
						<BatchInfo batchInfo={batchInfo} />
						<EquipmentList equipment={batchInfo.equipment} />
					</div>
				</>
			)}

			<UpdatesContainer batchInfo={batchInfo} />
			<button onClick={() => navigate(`/batch/${batchInfo?.recipeID}/update/${bid}`)} id="add-update-button">Add Update</button>
		</div>
	);
}
