import './App.css';
import React, { useState } from 'react';
import FortuneTeller from './components/FortuneTeller';
import Image from './components/Image';
import Sort from './components/Sort';


const App = () => {
  const initial = {
    name: "Taro",
    gender: 'men',
  }

  const [name, setName] = useState(initial.name)

  const clickChangeName = () => {
    const ramdomNumber = Math.floor(Math.random() * 3 + 1)
    if (ramdomNumber === 1) {
      setName('一郎')
    }
    else if (ramdomNumber === 2) {
      setName('二郎')
    }
    else if (ramdomNumber === 3) {
      setName('三郎')
    }
  }

  return (
    <>
      <div onClick={clickChangeName}>
        <h2>
          {name}
        </h2>
      </div>

      <div>
        <Image />
      </div>
      <div>
        <Image />
      </div>
      <div>
        <FortuneTeller/>
      </div>
      <div>
        <Sort />
      </div>
    </>

  );
}

export default App;
