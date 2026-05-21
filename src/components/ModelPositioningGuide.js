import React from 'react';

const ModelPositioningGuide = ({ show, onPositionChange }) => {
  if (!show) return null;

  return (
    <div className="fixed top-20 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm z-50 border border-white/20">
      <h3 className="font-semibold mb-3 text-yellow-300">🎯 Model Positioning Guide</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-300 mb-1">Scale</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            defaultValue="1.5"
            className="w-full"
            onChange={(e) => onPositionChange('scale', parseFloat(e.target.value))}
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-300 mb-1">Y Position</label>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            defaultValue="0.2"
            className="w-full"
            onChange={(e) => onPositionChange('y', parseFloat(e.target.value))}
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-300 mb-1">Z Position</label>
          <input
            type="range"
            min="-1"
            max="2"
            step="0.1"
            defaultValue="0.3"
            className="w-full"
            onChange={(e) => onPositionChange('z', parseFloat(e.target.value))}
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-300 mb-1">Light Intensity</label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            defaultValue="2.5"
            className="w-full"
            onChange={(e) => onPositionChange('lightIntensity', parseFloat(e.target.value))}
          />
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>• Red box shows target area</p>
        <p>• Yellow dot is center point</p>
        <p>• Grid shows ground level</p>
      </div>
    </div>
  );
};

export default ModelPositioningGuide;
