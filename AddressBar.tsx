
import React from 'react';

interface AddressBarProps {
  url: string;
}

const AddressBar: React.FC<AddressBarProps> = ({ url }) => {
  return (
    <div className="p-2 bg-gray-950 border-b border-gray-800">
      <div className="bg-black rounded-md px-4 py-1.5 text-sm text-gray-400 truncate">
        {url}
      </div>
    </div>
  );
};

export default AddressBar;