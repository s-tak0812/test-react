import React, { VFC } from 'react'
import Modal from "react-modal"

Modal.setAppElement('#root');
/**
 * モーダルの共通コンポーネント
 */
const ModalWrapper = (props) => {
  const {
    id,
    isOpen,
    isLoading = false,
    className = null,
    onClickCloseButton = null,
  } = props

  return (
    <Modal
      id={id}
      isOpen={isOpen}
      bodyOpenClassName='Open'
      overlayClassName='Wrap'
    >
      {onClickCloseButton &&
        <div>
          <span>OFF</span>
        </div>
      }
      {props.children}
    </Modal>
  )
}

export default ModalWrapper