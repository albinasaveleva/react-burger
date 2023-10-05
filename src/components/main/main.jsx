import React from "react";
import mainStyle from './main.module.css';
import useModal from '../../hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';


import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getIngredients } from "../../services/actions/ingredients";

export default function Main() {
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getIngredients())
  }, [dispatch])

  const [ modalContent, setModalContent ] = React.useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();


  const modalBody = () => {
    if (modalContent.component === 'OrderDetails') {
      return <OrderDetails />
    } else if (modalContent.component === 'IngredientDetails') {
      return <IngredientDetails />
    }
  }

  return ( 
    <>
      <main className={`pb-10 ${mainStyle.container}`}>
        <BurgerIngredients openModal={openModal} setModalContent={setModalContent} />
        <BurgerConstructor openModal={openModal} setModalContent={setModalContent} /> 
      </main>
      { isModalOpen && modalContent !== null
        ? <Modal title={modalContent.title} closeModal={closeModal}>
          { modalBody() }
          </Modal>
        : null
      }
    </>
  );
}