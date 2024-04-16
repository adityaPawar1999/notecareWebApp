import React, { useState } from 'react';
import PinIcon from '@mui/icons-material/Pin';

function PinnedComponent({ content }) {
  const [isPinned, setIsPinned] = useState(false);
  const [position, setPosition] = useState({ top: '50px', left: '50px' });

  const handlePinToggle = () => {
    setIsPinned(!isPinned);
  };

  const handleClick = () => {
    if (!isPinned) {
      setPosition({ top: '50px', left: '50px' });
    }
  };

  return (
    <div
      className="absolute bg-white p-4 shadow-lg border rounded-lg"
      style={{ ...position, zIndex: isPinned ? 999 : 1 }}
      onClick={handleClick}
    >
      {content}
      <button onClick={handlePinToggle}>
        <PinIcon /> {isPinned ? 'Unpin' : 'Pin'}
      </button>
    </div>
  );
}

export default PinnedComponent;
