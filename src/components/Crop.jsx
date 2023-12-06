import React, { VFC, useRef, useState } from "react"
import Cropper, { ReactCropperElement } from "react-cropper"
import "cropperjs/dist/cropper.css"
import ModalWrapper from "./Modal"

const Crop = (props) => {
  const {
    open,
    url,
    setCropUrl = () => null,
    fileInputElement,
    stateModal,
    onClose,
  } = props

  const cropperRef = useRef(null)

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedImageName = `crop.jpg`
      const croppedImageType = 'image/jpeg'
      const quality = 1.0
      const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas()
      setCropUrl(croppedCanvas.toDataURL(croppedImageType, quality))
      croppedCanvas.toBlob((imgBlob) => {
        const croppedImgFile = new File([imgBlob], croppedImageName, {type: croppedImageType})
        const dt = new DataTransfer();
        dt.items.add(croppedImgFile);
        fileInputElement.current.files = dt.files
      }, croppedImageType, quality);
    }
    onClose()
  };

  return (
    <>
      <ModalWrapper id={`cropperModal`} isOpen={open}>
        <Cropper
          src={url}
          style={{ width: "100%", maxHeight: "calc(90vh - 240px)"}}
          initialAspectRatio={'free'}
          aspectRatio={'free'}
          viewMode={1}
          autoCropArea={1}
          restore={false}
          dragMode={`none`}
          ref={cropperRef}
        />
        <div>
          <button onClick={getCropData}>完了</button>
        </div>
      </ModalWrapper>
    </>
  )
}

export default Crop