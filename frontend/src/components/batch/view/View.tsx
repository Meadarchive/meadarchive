import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getBatchByBID from "../../../api/get/getBatchByBID";
import { BatchWithUpdates } from "../../../api/interfaces/batchInterface";
import UpdatesContainer from "./UpdatesContainer";
import "./styles/view.css";

export default function View() {
	const params = useParams<{ bid?: string }>();
	const bid = params.bid || "";

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
						<div className="batch-info">
							<div>Stage: {batchInfo.stage}</div>
							<div>Date Started: {batchInfo.dateStarted}</div>
							<div>
								Initial Gravity: {batchInfo.initialGravity}
							</div>
							<div>Author: {batchInfo.author}</div>
							<div>Water: {batchInfo.water}</div>
							<div id="equipment-title">Equipment:</div>
							<div className="equipment-list">
								{batchInfo.equipment &&
									batchInfo.equipment.map((item, index) => (
										<div key={index}>
											{Object.entries(item).map(
												([key, value], index) => (
													<div
														className="equipment-item"
														key={index}
													>
														{key}: {value}
													</div>
												)
											)}
										</div>
									))}
							</div>
						</div>
					</div>
				</>
			)}

			<UpdatesContainer batchInfo={batchInfo} />
		</div>
	);
}
