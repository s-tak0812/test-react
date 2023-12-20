import React, { useState, useRef } from 'react'

const selectFruits = {
  none: 0,
  apple: 1,
  banana: 2,
  melon: 3,
  watermelon: 4,
  dango: 5,
  pineapple: 6,
  peach: 7,
  kiwi: 8,
  anko: 9,
  coke: 10,
}

const getSelectFruitsName = (type) => {
  switch (type) {
    case selectFruits.none:
      return `漢は黙って汁のみ`
    case selectFruits.apple:
      return `リンゴ`
    case selectFruits.banana:
      return `バナナ`
    case selectFruits.melon:
      return `メロン`
    case selectFruits.watermelon:
      return `スイカ`
    case selectFruits.dango:
      return `だんご`
    case selectFruits.pineapple:
      return `パイナップル`
    case selectFruits.peach:
      return `もも`
    case selectFruits.kiwi:
      return `キウイフルーツ`
    case selectFruits.anko:
      return `あんこ`
    case selectFruits.coke:
      return `コーラ`
  }
}

const Select = () => {

  const [fruitList, setFruitList] = useState([0])
  const [error, setError] = useState()
  const selectRef = useRef(null)

  const handleSelectedFruit = (e) => {
    const selectKeys = Array.from(e.target.selectedOptions, (option) => Number(option.value))

    // あんことコーラ一緒にしたくないよね？
    if (
      ((selectKeys.includes(selectFruits.anko) && selectKeys.includes(selectFruits.coke))) ||
      ((fruitList.includes(selectFruits.anko) && selectKeys.includes(selectFruits.coke))) ||
      ((selectKeys.includes(selectFruits.anko) && fruitList.includes(selectFruits.coke)))
    ) {
      setError("＜そりゃあないぜ")
      return
    }

    for (const key of selectKeys) {
      // "制限なし"が含まれている場合、"制限なし"をセットして終了
      if (key === 0) {
        setFruitList([0])
        setError("＜なぬ")
        return
      }
    }

    let newSelectedKeys

    if (fruitList[0] === selectFruits.none) {
      // fruitListが[0]の場合はselectKeysのみを設定
      newSelectedKeys = selectKeys
    } else {
      // それ以外の場合はfruitListとselectKeysを結合
      newSelectedKeys = [...new Set([...fruitList, ...selectKeys])]
    }
    setFruitList(newSelectedKeys)
    setError("＜おｋ")
  }

  const disabledOption = (key) => {
    return fruitList.includes(key)
  }

  const deleteFruit = (fruitKey) => {
    setError()
    const newfruitList = fruitList.filter((key) => key !== fruitKey)
    if (newfruitList.length === 0) {
      setFruitList([0])
    } else {
      setFruitList(newfruitList)
    }
    if (selectRef.current) {
      selectRef.current.selectedIndex = -1
    }
  }

  return (
    <>
      <div style={{margin: '200px 0 0 200px'}}>
        <h3>フルーツポンチに何入れたい？</h3>
        <select
          size= "11"
          multiple={true}
          onChange = {handleSelectedFruit}
          ref={selectRef}
          style={{width: '250px'}}
        >
          {Object.values(selectFruits).map((key) => {
            return (
              <option
                key={key}
                value={key}
                disabled={disabledOption(key)}
                onClick={() => {console.log('クリック！')}}
              >
                {getSelectFruitsName(key)}
              </option>
            )
          })}
        </select>
        <span onClick={() => setError('＜OMG!')}>( ﾟДﾟ)</span>
        <span>{error}</span>
      </div>

      <div style={{margin: '50px 0 0 200px'}}>
        <p><strong>内容物</strong></p>
        {fruitList.slice().sort((a, b) => a - b).map(key => (
          <div key={key}>
            {getSelectFruitsName(key)}
            {key != 0 && (
              <div className={"deleteButton"} onClick={() => {deleteFruit(key)}}>
                ✕
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Select


