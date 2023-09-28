import React from "react";
import PropTypes from 'prop-types';
import modalOverlayStyle from './modal-over-lay.module.css';

export default function ModalOverlay(props) {
  return (
    <div id="modal-over-lay" onClick={props.closeModal} className={modalOverlayStyle.modalOverLay} />
  )
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};


