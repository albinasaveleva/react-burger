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
  React.useEffect(() => {
    const keyDownHandler = e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        props.closeModal();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  
  return ReactDOM.createPortal (
      (<>
        <div id="modal" className={`pt-10 pr-10 pb-10 pl-10 ${modalStyle.modal}`}>
          <div className={modalStyle.modalHeader}>
            {
              props.title && 
                <p className="pt-3 pb-3 text text_type_main-large">
                  {props.title}
                </p>
            }
            <div className={modalStyle.closeBtn} onClick={props.closeModal}>
              <CloseIcon type="primary" />
            </div>
          </div>
          <div className={modalStyle.modalBody}>
            { props.children }
          </div>
        </div>
        <ModalOverlay closeModal={props.closeModal} />
      </>
      ), modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired
};