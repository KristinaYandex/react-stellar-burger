import { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import stylesModal from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';

function Modal ({children, onClose, title}) {

  const reactModals = document.getElementById("react-modals");

  useEffect(() => {
    function closeEsc(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeEsc); 
    return () => {
      document.removeEventListener('keydown', closeEsc);
    }
  })
  
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={stylesModal.container}>
        <div className={stylesModal.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button className={stylesModal.button_close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={stylesModal.component}>{children}</div>
      </div>
    </>,
    reactModals
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
}

export default Modal;