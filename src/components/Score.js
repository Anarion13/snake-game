import React from 'react';

const Score = ({ score }) => {
  const style = {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#000000',
    fontFamily: 'Courier New, monospace'
  };

  return (
    <div data-testid="score" style={style}>
      Score: {score}
    </div>
  );
};

export default Score;