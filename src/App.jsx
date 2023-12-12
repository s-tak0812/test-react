import './App.css';
import React, { useState, useCallback, useEffect, useRef, FC } from 'react';
import { useDropzone } from 'react-dropzone'
import Crop from './components/Crop';
import FortuneTeller from './components/FortuneTeller';
import JankenGame from './components/Janken';
import Image from './components/Image';
import Sort from './components/Sort';
import Card from '@mui/material/Card'
import FamilyTree from './components/FamilyTree';


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
        <FortuneTeller/>
      </div>
      <div>
        <Sort />
      </div>
      <div>
        <Card />
      </div>
    </>

  );
}

export default App;
