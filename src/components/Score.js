import React from 'react';

const Score = ({ score, score2 }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#2b0a3d',
    fontFamily: 'Courier New, monospace'
  };

  const playerStyle = {
    flex: 1
  };

  return (
    <div data-testid="score" style={containerStyle}>
      <div style={playerStyle}>
        Player 1 (Lilac): {score}
      </div>
      <div style={playerStyle}>
        Player 2 (Amethyst): {score2}
      </div>
    </div>
  );
};

export default Score;
