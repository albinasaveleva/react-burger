import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyle from './modal.module.css';
import { 
  Box,
  CloseIcon,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from "../modal-over-lay/modal-over-lay";

const modalRoot = document.getElementById("react-modals");

export default function Modal(props) {
  const doInvisibleModal = () => {
    document.body.style = '';
    document.querySelector('#root').style = '';
    document.querySelector('#react-modals').style = '';
  }

  const doVisibleModal = () => {
    document.body.style.backgroundColor = 'transparent';
    document.querySelector('#root').style.display = 'none';
    document.querySelector('#react-modals').style.display = 'flex';
  }

  const closeModal = () => {
    props.setOpenedModal(false);
  }

  React.useEffect(() => {
    doVisibleModal();

    const keyDownHandler = e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      doInvisibleModal();
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  
  return ReactDOM.createPortal (
      (<div id="modal" className={`pt-10 pr-10 pb-10 pl-10 ${modalStyle.modal}`}>
        <div className={modalStyle.modalHeader}>
          {
            props.title && 
              <p className="pt-3 pb-3 text text_type_main-large">
                {props.title}
              </p>
          }
          <div className={modalStyle.closeBtn} onClick={closeModal}>
            <CloseIcon type="primary" />
          </div>
        </div>
        <div className={modalStyle.modalBody}>
          { props.children }
        </div>
        <ModalOverlay closeModal={closeModal} />
      </div>), modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  setOpenedModal: PropTypes.func.isRequired
};