import React from "react";
import mainStyle from './main.module.css';

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const url = 'https://norma.nomoreparties.space/api/ingredients';

export default function Main() {
  const [ ingredients, setIngredients ] = React.useState([]);
  const [ components, setComponents ] = React.useState([]);
  const [ openedModal, setOpenedModal ] = React.useState(false);
  const [ modalContent, setModalContent ] = React.useState(null);


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
          setComponents(data);
        })
        .catch(error => console.error(error));
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
        { ingredients.length > 0 && <BurgerIngredients ingredients={ingredients} setOpenedModal={setOpenedModal} setModalContent={setModalContent} /> }
        { components.length > 0 && <BurgerConstructor components={components} setOpenedModal={setOpenedModal} setModalContent={setModalContent} /> } 
      </main>
      { openedModal && modalContent !== null
        ? <Modal title={modalContent.title} setOpenedModal={setOpenedModal}>
            { modalBody() }
          </Modal>
        : null
      }
    </>
  );
}