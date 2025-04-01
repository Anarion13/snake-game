import React from 'react';

const Food = ({ position }) => {
  const style = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: '#000000',
    left: `${position[0] * 20}px`,
    top: `${position[1] * 20}px`,
  };

  return <div data-testid="food" style={style}></div>;
};

export default Food;