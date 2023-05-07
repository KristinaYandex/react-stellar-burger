import stylesModalOverlay from "./modal-overlay.module.css";

function ModalOverlay({onClose}) {
  return (
      <div className={stylesModalOverlay.overlay} onClick={onClose}></div>
  )
}

export default ModalOverlay;