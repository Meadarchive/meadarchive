import React from "react";
import { BatchWithUpdates } from "../../../api/interfaces/batchInterface";

interface EquipmentListProps {
	equipment: BatchWithUpdates["equipment"];
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equipment }) => {
	return (
		<>
			<div id="equipment-title">Equipment:</div>
			<div className="equipment-list">
				{equipment &&
					equipment.map((item, index) => (
						<div key={index}>
							{Object.entries(item).map(([key, value], index) => (
								<div className="equipment-item" key={index}>
									{key}: {value}
								</div>
							))}
						</div>
					))}
			</div>
		</>
	);
};

export default EquipmentList;
