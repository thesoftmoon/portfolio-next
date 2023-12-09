import React from 'react'
import '../styles/Modal.scss'

function Modal(props) {
    return (
        <div className='modal-container'>
            <div className="modal">
                <div className="close-btn">
                    <button onClick={props.onClose}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </button>
                </div>
                <div className="modal-content">
                    {props.children}
                </div>
            </div>
            <div className="background" onClick={props.onClose}></div>
        </div>
    )
}

export default Modal