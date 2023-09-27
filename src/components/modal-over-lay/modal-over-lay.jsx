import React from "react";
import ReactDOM from 'react-dom';
import modalOverlayStyle from './modal-over-lay.module.css';

const modalRoot = document.getElementById("react-modals");

export default function ModalOverlay(props) {
  const closeModal = () => {
    props.setOpenedModal(false);
  }

  React.useEffect(() => {
    const clickHandler = (e) => {
      e.preventDefault();

      if (e.target.id === 'modal-over-lay') {
        closeModal();
      }
    }

    document.addEventListener('click', clickHandler );

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  return ReactDOM.createPortal(
    (
      <div id="modal-over-lay" className={modalOverlayStyle.modalOverLay}>
        { props.children }
      </div>
    ), 
    modalRoot
  );
};


