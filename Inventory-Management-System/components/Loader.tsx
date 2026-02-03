import React from 'react';

const Loader = () => {
  return (
    /* 1. Removed flex-1 to prevent it from fighting for space.
       2. Added h-20 (80px) to ensure the 'room' is tall enough.
       3. Added overflow-visible so the bounce never gets cut off.
    */
    <div className="flex items-center justify-center w-full min-h-20 overflow-visible bg-transparent">
      <div className="flex items-center h-20 space-x-2 overflow-visible">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;