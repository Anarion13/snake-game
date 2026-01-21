import React from 'react';

const Score = ({ score, score2 }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#000000',
    fontFamily: 'Courier New, monospace'
  };

  const playerStyle = {
    flex: 1
  };

  return (
    <div data-testid="score" style={containerStyle}>
      <div style={playerStyle}>
        Player 1 (Black): {score}
      </div>
      <div style={playerStyle}>
        Player 2 (Blue): {score2}
      </div>
    </div>
  );
};

export default Score;