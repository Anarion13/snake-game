import React from 'react';

const Snake = ({ segments, color = '#000000' }) => {
  return (
    <div data-testid="snake">
      {segments.map((segment, index) => {
        const style = {
          position: 'absolute',
          width: '20px',
          height: '20px',
          backgroundColor: color,
          border: `1px solid ${color}`,
          left: `${segment[0] * 20}px`,
          top: `${segment[1] * 20}px`,
          zIndex: 1  // Lower z-index to ensure it stays below overlays
        };

        return <div key={index} style={style}></div>;
      })}
    </div>
  );
};

export default Snake;