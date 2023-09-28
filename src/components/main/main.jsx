import React from "react";
import mainStyle from './main.module.css';
import useModal from '../../hooks/useModal';

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const url = 'https://norma.nomoreparties.space/api/ingredients';

export default function Main() {
  const [ ingredients, setIngredients ] = React.useState([]);
  // const [ components, setComponents ] = React.useState([]);
  const [ modalContent, setModalContent ] = React.useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();


  React.useEffect(() => {
    const requestData = () => {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Что-то пошло не так...');
          }
        })
        .then(({data}) => {
          setIngredients(data);
        })
        .catch(console.error);
    };
    requestData();
  }, []);

  const modalBody = () => {
    if (modalContent.component === 'OrderDetails') {
      return <OrderDetails content={modalContent.content} />
    } else if (modalContent.component === 'IngredientDetails') {
      return <IngredientDetails content={modalContent.content} />
    }
  }

  return (
    <>
      <main className={`pb-10 ${mainStyle.container}`}>
        { ingredients.length > 0 && <BurgerIngredients ingredients={ingredients} openModal={openModal} setModalContent={setModalContent} /> }
        { ingredients.length > 0 && <BurgerConstructor components={ingredients} openModal={openModal} setModalContent={setModalContent} /> } 
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