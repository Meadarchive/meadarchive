import React from "react";
import { BatchWithUpdates } from "../../../api/interfaces/batchInterface";

interface EquipmentListProps {
	equipment: BatchWithUpdates["equipment"];
}

const EquipmentItem: React.FC<{ key: string; value: string }> = ({
	key,
	value,
}) => (
	<div className="equipment-item">
		{key}: {value}
	</div>
);

const EquipmentList: React.FC<EquipmentListProps> = ({ equipment }) => (
	<>
		<div id="equipment-title">Equipment:</div>
		<div className="equipment-list">
			{equipment?.map((item, index) => (
				<div key={index}>
					{Object.entries(item).map(([key, value]) => (
						<EquipmentItem key={key} value={value} />
					))}
				</div>
			))}
		</div>
	</>
);

export default EquipmentList;
