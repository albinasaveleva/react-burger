import React from "react";
import PropTypes from 'prop-types';

import { 
  Box,
  CloseIcon,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyle from './modal.module.css';

export default function Modal(props) {
  const doVisibleRoot = () => {
    document.body.style = '';
    document.querySelector('#root').style = '';
  }

  const doInvisibleRoot = () => {
    document.body.style.backgroundColor = 'transparent';
    document.querySelector('#root').style.opacity = '0';
  }

  const closeModal = () => {
    props.setOpenedModal(false);
  }

  React.useEffect(() => {
    doInvisibleRoot();

    const keyDownHandler = e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      doVisibleRoot();
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  
  return (
      <div id="modal" className={`pt-10 pr-10 pb-10 pl-10 ${modalStyle.modal}`}>
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
      </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  setOpenedModal: PropTypes.func.isRequired
};