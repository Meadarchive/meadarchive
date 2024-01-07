import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getBatchByBID from "../../../api/get/getBatchByBID";
import { BatchWithUpdates } from "../../../api/interfaces/batchInterface";
import UpdatesContainer from "./UpdatesContainer";
import BatchInfo from "./BatchInfo";
import EquipmentList from "./EquipmentList";
import "./styles/view.css";
import BatchQR from "../BatchQR";
import getBatchQRCodeLink from "../../../api/get/getBatchQRCodeLink";

interface Params {
	bid?: string;
	[key: string]: string | undefined;
}

export default function View() {
	const { bid = "" } = useParams<Params>();
	const navigate = useNavigate();

	const [batchInfo, setBatchInfo] = useState<BatchWithUpdates | null>(null);

	useEffect(() => {
		const fetchBatchInfo = async () => {
			const recipeInfo = await getBatchByBID(bid);
			setBatchInfo(recipeInfo);
		};

		fetchBatchInfo();
	}, [bid]);

	const renderBatchInfo = () => (
		<>
			<div id="batch-created-title">Batch Created</div>
			<div className="batch-info-container">
				<div className="starting-container">
					<BatchInfo batchInfo={batchInfo!} />
					<EquipmentList equipment={batchInfo!.equipment} />
				</div>
				<div className="batch-qr-code">
					<BatchQR batchLink={window.location.href} />
					<div className="download-qr">
						<a href={getBatchQRCodeLink(window.location.href, (batchInfo!.batchName))} download>
							<button className='download-qr-button'>
								Download
							</button>
						</a>
					</div>
				</div>
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
