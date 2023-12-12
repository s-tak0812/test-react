import React, { useState } from 'react';

const Chinchiro = () => {
  const [dice1, setDice1] = useState<string>(1);
  const [dice2, setDice2] = useState<number>(1);

  const rollDice = () => {
    const newDice1 = Math.floor(Math.random() * 6) + 1;
    const newDice2 = Math.floor(Math.random() * 6) + 1;
    setDice1(newDice1);
    setDice2(newDice2);
  };

  return (
    <div>
      <h1>Chinchiro </h1>
      <div>
        <p>Dice 1: {dice1}</p>
        <p>Dice 2: {dice2}</p>
      </div>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default Chinchiro;
