import React, { useState, VFC } from 'react'
import { ReactSortable } from "react-sortablejs"

const Sort = () => {
  const lists = ['け','ち','う','た']
  const [stringList, setStringList] = useState(lists)
  return (
    <>
      <div className='flex'>
        <ReactSortable
          animation={500}
          list={stringList}
          setList={setStringList}
          handle={'.sort_handle'}
        >
          {stringList.map((string, index) => (
            <h1 key={index} className='sort_handle'>{string}</h1>
          ))}
        </ReactSortable>
      </div>
    </>
  )
}

export default Sort