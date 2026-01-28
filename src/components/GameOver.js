import React from 'react';

const GameOver = ({ score, score2, winner, onRestart }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#2b0a3d',
    color: '#e9ddff',
    padding: '20px',
    textAlign: 'center',
    zIndex: 1000,
    border: '2px solid #8f4fd6',
    fontFamily: 'Courier New, monospace'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#8f4fd6',
    color: '#2b0a3d',
    border: '2px solid #b08cff',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Courier New, monospace',
    fontWeight: 'bold',
    marginTop: '10px'
  };

  return (
    <div data-testid="game-over" style={style}>
      <h2>GAME OVER</h2>
      {winner && <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{winner} WINS!</p>}
      <p>Player 1 Score: {score}</p>
      <p>Player 2 Score: {score2}</p>
      <button
        onClick={onRestart}
        style={buttonStyle}
      >
        PLAY AGAIN
      </button>
    </div>
  );
};

export default GameOver;
