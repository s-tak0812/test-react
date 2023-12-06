import './App.css';
import React, { useState, useCallback, useEffect, useRef, FC } from 'react';
import { useDropzone } from 'react-dropzone'


const App = () => {
  const initial = {
    name: "Taro",
    gender: 'men',
  }

  const [name, setName] = useState(initial.name)
  const [url, setUrl] = useState(``)
  const [cropUrl, setCropUrl] = useState(``)
  const [errorMessage, setErrorMessage] = useState('')
  const inputElement = useRef(null)
  
  const onChangeInputFile = (e, setState) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setState(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      if (!url) return
      setErrorMessage()
      setUrl('')
      let imageInputForm = document.getElementById('imageFile');
      imageInputForm.value = '';
    }
  }

  const setInputFiles = (acceptedFiles, fileInputElement) => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(acceptedFiles[0])
    fileInputElement.current.files = dataTransfer.files
  }

  const setFileInputAndPreview = (acceptedFiles, fileInputElement, setState) => {
    if (!acceptedFiles[0].type.startsWith('image/')) {
      return
    }

    if (acceptedFiles[0].size > 5 * 1024 * 1024) {
      setErrorMessage({
        message: "選択した画像のデータ容量が5MBを超えています。",
      })
      setUrl('')
      return
    }

    setInputFiles(acceptedFiles, fileInputElement)
    const reader = new FileReader()
    reader.readAsDataURL(acceptedFiles[0])
    reader.onload = (e) => {
      setState(e.target.result)
    }
    setErrorMessage()
  }

  const onDrop = useCallback((acceptedFiles) => {
    setFileInputAndPreview(acceptedFiles, inputElement, setUrl)
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*'
  })


  return (
    <div>
      {name}
      <div>
        <div onClick={ onChangeInputFile } className='Clear'>
          削除
        </div>
      </div>
      <div {...getRootProps()} className='Dropbox'>
        <div>
          <div>
            ここに画像をドロップ
            <span>または</span>
          </div>
          <div>
            <label>
              <input
                type={"file"}
                accept={'image/*'}
                src={url}
                onChange={(e) => onChangeInputFile(e, setUrl)}
                {...getInputProps()}
                ref={inputElement}
                id={'imageFile'}
              />
              <div className='Click'>クリックで画像を選択</div>

              {errorMessage && (
                <span>{errorMessage.message}</span>
              )}
            </label>
          </div>
          <div className="Image">
            {url && <img src={url}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
