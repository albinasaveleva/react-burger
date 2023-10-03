import React from "react";
import mainStyle from './main.module.css';
import useModal from '../../hooks/useModal';
import { IngredientsContext, OrderContext, TotalPriceContext } from '../../services/mainContext';

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const url = 'https://norma.nomoreparties.space/api/ingredients';

export default function Main() {
  const [ ingredients, setIngredients ] = React.useState([]);
  const ingredientsContextValue = React.useMemo(() => {
    return { ingredients, setIngredients };
  }, [ingredients, setIngredients]);

  const [ order, setOrder ] = React.useState({
    buns: null,
    ingredients: null,
    number: null,
    name: null
  });
  const orderContextValue = React.useMemo(() => {
    return { order, setOrder };
  }, [order, setOrder]);

  const [ totalPrice, setTotalPrice ] = React.useState(0);
  const totalPriceContextValue = React.useMemo(() => {
    return { totalPrice, setTotalPrice };
  }, [totalPrice, setTotalPrice]);

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
      <IngredientsContext.Provider value={ingredientsContextValue}>
        <OrderContext.Provider value={orderContextValue} >
          <TotalPriceContext.Provider value={totalPriceContextValue}>
            <main className={`pb-10 ${mainStyle.container}`}>
              <BurgerIngredients openModal={openModal} setModalContent={setModalContent} />
              <BurgerConstructor openModal={openModal} setModalContent={setModalContent} /> 
            </main>
          </TotalPriceContext.Provider>
        </OrderContext.Provider>
      </IngredientsContext.Provider> 
      { isModalOpen && modalContent !== null
        ? <Modal title={modalContent.title} closeModal={closeModal}>
          { modalBody() }
          </Modal>
        : null
      }
    </>
  );
}