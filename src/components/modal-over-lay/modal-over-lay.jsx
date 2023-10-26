import React from "react";
import PropTypes from 'prop-types';
import modalOverlayStyle from './modal-over-lay.module.css';

function ModalOverlay({handleClose}) {
  return (
    <div id="modal-over-lay" onClick={handleClose} className={modalOverlayStyle.modalOverLay} />
  )
};

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default React.memo(ModalOverlay);