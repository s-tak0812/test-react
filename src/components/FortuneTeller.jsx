import React, { useState } from 'react';

const FortuneTeller = () => {
  const [fortune, setFortune] = useState(null);

  const fortunes = [
    '大吉',
    '中吉',
    '小吉',
    '吉',
    '凶',
    '大凶'
  ];

  const getFortune = () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    setFortune(fortunes[randomIndex]);
  };

  return (
    <div>
      <h1>占い</h1>
      <button onClick={getFortune}>占う</button>
      {fortune && <p>今日の運勢: {fortune}</p>}
    </div>
  );
};

export default FortuneTeller;
