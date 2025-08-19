
import React from 'react';

interface BrowserViewProps {
  src: string;
}

const BrowserView: React.FC<BrowserViewProps> = ({ src }) => {
  return (
    <div className="flex-1 bg-white">
      <iframe
        key={src} // Re-mount iframe on src change to ensure navigation
        src={src}
        title="AI Controlled Browser"
        className="w-full h-full border-0"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
        onError={() => console.error(`Failed to load iframe content from: ${src}`)}
      >
        <p>متصفحك لا يدعم iframes.</p>
      </iframe>
    </div>
  );
};

export default BrowserView;
