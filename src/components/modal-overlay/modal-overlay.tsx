import stylesModalOverlay from "./modal-overlay.module.css";
import PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

interface IModalOverlay {
  onClose: () => void;
} 

const ModalOverlay: FunctionComponent<IModalOverlay> = ({onClose}) => {
  return (
    <div className={stylesModalOverlay.overlay} onClick={onClose}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;