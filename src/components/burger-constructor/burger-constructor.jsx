import React from "react";
import update from 'immutability-helper';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { 
  Box,
  Button,
  ConstructorElement,
  CurrencyIcon, 
  DragIcon,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyle from './burger-constructor.module.css';

import { createOrder } from "../../services/order/actions";
import { ADD_INGREDIENTS, ADD_BUNS, SORT_INGREDIENTS } from "../../services/burgerConstructor/actions";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import useModal from '../../hooks/useModal';
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";

import { nanoid } from 'nanoid'

export default function BurgerConstructor(props) {
  const { isModalOpen, openModal, closeModal } = useModal();

  const { buns, ingredients } = useSelector(store => store.burgerConstructor)
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(()=>{
    const ingredientsPrice = ingredients.length > 0 
      ? ingredients.reduce((acc, item) => {
        acc += item.price;
        return acc;
      }, 0)
      : 0;
    const bunsPrice = buns ? buns.price * 2 : 0;

    setTotalPrice(ingredientsPrice + bunsPrice);
  }, [ingredients, buns]);

  const dispatch = useDispatch();

  const handleClick = () => {  
    dispatch(createOrder(buns,ingredients));
    openModal();
  }

  const handleDrop = (item) => {
    if (item.type === 'bun') {
      dispatch({
        type: ADD_BUNS,
        buns: {...item, constructorId: item._id}
      })
    } else {
      dispatch({
        type: ADD_INGREDIENTS,
        ingredients: {...item, constructorId: nanoid()}
      })
    }
  }

  const [, dropTarget] = useDrop({
    accept: "burgerIngredient",
    drop({item}) {
      handleDrop(item);
    },
  });

  const renderTopBun  = React.useCallback(
    () => {
      return (
        buns   
          ? <ConstructorElement
              type={'top'}
              isLocked={true}
              text={`${buns.name} (верх)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          : <ConstructorElement
            type={'top'}
            text={'Выберите булку'}
            extraClass={'default'}
          />
      )
    }, [buns]
  );

  const renderBottomBun = React.useCallback(
    () => {
      return (
        buns 
          ? <ConstructorElement
              type={'bottom'}
              isLocked={true}
              text={`${buns.name} (низ)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          :  <ConstructorElement
              type={'bottom'}
              text={'Выберите булку'}
              extraClass={'default'}
            />
      )
    }, [buns]
  );

  const renderIngredients = React.useCallback(
    () => {
      return (
        ingredients.length > 0 
          ? ingredients.map((item, index) => {
              return (
                <div className={`pr-2 ${burgerConstructorStyle.component}`} key={item.constructorId}>
                  <BurgerConstructorIngredient index={index} item={item} moveIngredient={moveIngredient} />
                </div>
              )
            }) 
          : <ConstructorElement
              type={undefined}
              text={'Выберите начинку'}
              extraClass={'default ml-8'}
            />
      )
    }, [ingredients]
  );

  const moveIngredient = (dragIndex, hoverIndex) => {
    const sortedIngredients = update(ingredients, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, ingredients[dragIndex]],
      ],
    });

    dispatch({
      type: SORT_INGREDIENTS,
      ingredients: sortedIngredients
    })
  }

  return (
    <>
      <section className={`pt-25 ${burgerConstructorStyle.container}`} id="burger-constructor">
        <div ref={dropTarget} className={`ml-4 mb-10 ${burgerConstructorStyle.components}`}>
          <div className={`mb-4 ml-8 ${burgerConstructorStyle.topBun}`}>
            { renderTopBun() }
          </div>
          <div className={burgerConstructorStyle.content}>
            { renderIngredients() }
          </div>
          <div className={`mt-4 ml-8 ${burgerConstructorStyle.buttomBun}`}>
            { renderBottomBun() }
          </div>
        </div>
          <div className={`mr-4 ${burgerConstructorStyle.info}`}>
            <div className={`mr-10 ${burgerConstructorStyle.price}`}>
              <span className="mr-1 text_type_digits-medium">
                {totalPrice}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={handleClick}>
              Оформить заказ
            </Button>
          </div>
      </section>
      {
        isModalOpen && 
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      }
    </>
  );
};