import React, {FC, ReactNode} from "react";
import {createPortal} from 'react-dom';
import modalStyle from './modal.module.css';
import { 
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from "../modal-over-lay/modal-over-lay";
import { useParams } from "react-router-dom";

type TComponentProps = {
  closeModal: () => void,
  title?: string,
  children: ReactNode,
};

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal: FC<TComponentProps> = ({closeModal, title, children}) => {
  const { id } = useParams();

  React.useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent): void => {
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
  
  return createPortal (
      (<>
        <div id="modal" className={`pt-10 pr-10 pb-10 pl-10 ${modalStyle.modal}`}>
          <div className={modalStyle.modalHeader}>
            {
              title 
              ? title === 'id' 
                ? <p className="pt-3 pb-3 text text_type_digits-default">{`#${id}`}</p>
                : <p className="pt-3 pb-3 text text_type_main-large">{title}</p>
              : null
            }
            <div className={modalStyle.closeBtn} onClick={closeModal}>
              <CloseIcon type="primary" />
            </div>
          </div>
          <div className={modalStyle.modalBody}>
            { children }
          </div>
        </div>
        <ModalOverlay handleClose={closeModal} />
      </>
      ), modalRoot
  );
};

export default Modal;