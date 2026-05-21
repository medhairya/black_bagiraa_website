import React, { useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // after full 2s spin, move forward
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <img
        src="/logo.png" // replace with your actual logo path
        alt="Bagiraa Logo"
        className="w-40 h-40 animate-spin-strict"
      />
    </div>
  );
};

export default LoadingScreen;