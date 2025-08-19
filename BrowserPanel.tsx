
import React from 'react';
import AddressBar from './AddressBar';
import BrowserView from './BrowserView';

interface BrowserPanelProps {
  iframeSrc: string;
}

const BrowserPanel: React.FC<BrowserPanelProps> = ({ iframeSrc }) => {
  return (
    <div className="flex-1 flex flex-col bg-black">
      <AddressBar url={iframeSrc} />
      <BrowserView src={iframeSrc} />
    </div>
  );
};

export default BrowserPanel;