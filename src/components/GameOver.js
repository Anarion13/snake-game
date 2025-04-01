import React from 'react';

const GameOver = ({ score, onRestart }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#000000',
    color: '#9EB764',
    padding: '20px',
    textAlign: 'center',
    zIndex: 10,
    border: '2px solid #9EB764',
    fontFamily: 'Courier New, monospace'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#9EB764',
    color: '#000000',
    border: '2px solid #9EB764',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Courier New, monospace',
    fontWeight: 'bold',
    marginTop: '10px'
  };

  return (
    <div data-testid="game-over" style={style}>
      <h2>GAME OVER</h2>
      <p>YOUR SCORE: {score}</p>
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