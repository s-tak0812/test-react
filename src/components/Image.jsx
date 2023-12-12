import React, { useState, useCallback, useEffect, useRef, FC } from 'react';
import { useDropzone } from 'react-dropzone'
import Crop from './Crop';


const Image = () => {
  const [url, setUrl] = useState(``)
  const [cropUrl, setCropUrl] = useState(``)
  const [errorMessage, setErrorMessage] = useState('')
  const inputElement = useRef(null)
  const [modal, setModal] = useState(false)
  const canvasElement = useRef(null);

  const closeModal = () => {
    setModal(false)
  }

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
      setCropUrl('')
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
        message: "重い",
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
      <h1>画像</h1>
      <div>
        <div onClick={ onChangeInputFile } className='Clear'>
          削除
        </div>
      </div>
      <div {...getRootProps()} className='Dropbox'>
        <div>
          <div>
            ここに画像をおいてね
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
            {cropUrl && <img src={cropUrl}/>}
            {url && <button type="button" className='Dropbox' onClick={() => setModal(true)}>改造</button>}
          </div>

          {modal && (
            <Crop
              open={modal}
              url={url}
              setCropUrl={setCropUrl}
              fileInputElement={inputElement}
              stateModal={() => {setModal(false)}}
              onClose={() => {closeModal()}}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default Image;
