import React, { useState } from 'react';

const JankenGame = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [cheatMode, setCheatMode] = useState(false);
  const [cheatResult, setCheatResult] = useState('');
  const [gameResult, setGameResult] = useState('');
  const [computerChoice, setComputerChoice] = useState(null);

  const choices = ['rock', 'paper', 'scissors'];

  const startGame = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
    setGameResult('');
    setCheatResult('');
  };

  const handleUserChoice = (choice) => {
    if (!computerChoice) {
      setUserChoice(choice);
      if (cheatMode) {
        setCheatResult('Now choose your hand after seeing the opponent\'s move.');
      } else {
        determineWinner(choice, computerChoice);
      }
    } else {
      setGameResult('Game in progress. Finish the current game first.');
    }
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setGameResult('It\'s a tie!');
    } else if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      setGameResult('You win!');
    } else {
      setGameResult('You lose!');
    }
  };

  const handleCheatMode = () => {
    if (cheatMode) {
      setUserChoice(null);
      setComputerChoice(null);
      setCheatResult('');
      setGameResult('');
    }
    setCheatMode(!cheatMode);
  };

  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <div>
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleUserChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <div>
        <button onClick={startGame} disabled={computerChoice !== null}>
          Start Game
        </button>
        <button onClick={handleCheatMode}>
          {cheatMode ? 'Disable Cheat Mode' : 'Enable Cheat Mode'}
        </button>
      </div>
      <div>
        <p>{cheatResult}</p>
        {computerChoice !== null && <p>Opponent chose: {computerChoice}</p>}
        <p>{gameResult}</p>
      </div>
    </div>
  );
};


export default JankenGame;