import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyle from './modal.module.css';
import { 
  Box,
  CloseIcon,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIngredientDetails } from "../../services/ingredientDetails/actions";

import ModalOverlay from "../modal-over-lay/modal-over-lay";

const modalRoot = document.getElementById("react-modals");

function Modal({closeModal, title, children}) {
  const item = useSelector(store => store.ingredientDetails.item);
  const dispatch = useDispatch();
  
  const handleClose = () => {
    closeModal();

    if (item) {
      dispatch(deleteIngredientDetails())
    }
  }

  React.useEffect(() => {
    const keyDownHandler = e => {
      if (e.key === 'Escape') {
        e.preventDefault();

        closeModal();
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
              title && 
                <p className="pt-3 pb-3 text text_type_main-large">
                  {title}
                </p>
            }
            <div className={modalStyle.closeBtn} onClick={handleClose}>
              <CloseIcon type="primary" />
            </div>
          </div>
          <div className={modalStyle.modalBody}>
            { children }
          </div>
        </div>
        <ModalOverlay handleClose={handleClose} />
      </>
      ), modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired
};

export default React.memo(Modal);