import React, {FC} from "react";
import modalOverlayStyle from './modal-over-lay.module.css';

type TComponentProps = {
  handleClose: () => void,
};

const ModalOverlay: FC<TComponentProps> = ({handleClose}) => {
  return (
    <div id="modal-over-lay" onClick={handleClose} className={modalOverlayStyle.modalOverLay} />
  )
};

export default ModalOverlay;