import React from 'react'
import '../styles/Modal.scss'

function Modal(props) {
  return (
    <div className='modal-container'>
        <div className="modal">
            <div className="close-btn"></div>
            <div className="modal-content">
                {props.children}
            </div>
        </div>
    </div>
  )
}

export default Modal