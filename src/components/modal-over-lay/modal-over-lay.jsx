import React from "react";
import PropTypes from 'prop-types';
import modalOverlayStyle from './modal-over-lay.module.css';

export default function ModalOverlay(props) {
  // React.useEffect(() => {
  //   const clickHandler = (e) => {
  //     e.preventDefault();

  //     if (e.target.id === 'modal-over-lay') {
  //       props.closeModal();
  //     }
  //   }

  //   document.addEventListener('click', clickHandler );

  //   return () => {
  //     document.removeEventListener('click', clickHandler);
  //   };
  // }, []);

  return (
    <div id="modal-over-lay" onClick={props.closeModal} className={modalOverlayStyle.modalOverLay} />
  )
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};


