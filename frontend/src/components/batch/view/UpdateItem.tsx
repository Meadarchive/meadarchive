// UpdateItem.tsx
import React from 'react';

interface UpdateItemProps {
  update: { [key: string]: any };
}

const UpdateItem: React.FC<UpdateItemProps> = ({ update }) => {
  return (
    <div className="update">
      {Object.entries(update).map(([propKey, propValue]) => (
        <div key={propKey}>
          {propKey}: {propValue}
        </div>
      ))}
    </div>
  );
};

export default UpdateItem;
