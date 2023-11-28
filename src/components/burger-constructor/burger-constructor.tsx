import React, { FC } from "react";
import update from 'immutability-helper';
import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

import { 
  Button,
  ConstructorElement,
  CurrencyIcon, 
} from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyle from './burger-constructor.module.css';

import { createOrder, clearOrderData } from "../../services/orderDetails/actions";
import { addIngredient, addBun, sortIngredients, deleteIngredient, resetBurgerConstructor } from "../../services/burgerConstructor/actions";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import useModal from '../../hooks/useModal';
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import Preloader from "../preLoader/preloader";

import { TIngredient } from "../../types/data";

const BurgerConstructor: FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const isLoginSuccess = useAppSelector((store) => store.auth.isLoginSuccess);

  const isOrderRequest = useAppSelector((store) => store.orderDetails.isRequest);
  const orderRequestSuccess = useAppSelector((store) => store.orderDetails.info.success);

  const buns = useAppSelector((store) => store.burgerConstructor.buns);
  const ingredients = useAppSelector((store) => store.burgerConstructor.ingredients);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getTotalPrice = (): number => {
    const ingredientsPrice: number = ingredients.length > 0 
      ? (ingredients as TIngredient[]).reduce((acc: number, item: TIngredient) => {
        acc += item.price;
        return acc;
      }, 0)
      : 0;
    const bunsPrice: number = buns ? buns.price * 2 : 0;

    return ingredientsPrice + bunsPrice;
  } 

  const handleClick = React.useCallback(() => {
    if (isLoginSuccess) {
      dispatch(createOrder(buns, ingredients));

      openModal();
    } else {
      navigate('/login');
    }
  }, [buns, ingredients])

  const handleDrop = (item: TIngredient): void => {
    if (item.type === 'bun') {
      dispatch(addBun(item))
    } else {
      dispatch(addIngredient(item))
    }
  }

  const [, dropTarget] = useDrop({
    accept: "burgerIngredient",
    drop({item}: {item: TIngredient}): void {
      handleDrop(item);
    },
  });

  const moveIngredient = (dragIndex: number, hoverIndex: number): void => {
    const sortedIngredients = update(ingredients, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, ingredients[dragIndex]],
      ],
    });

    dispatch(sortIngredients(sortedIngredients))
  };

  const renderTopBun  = React.useCallback(
    () => (
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
        price={0}
        thumbnail={''}
        extraClass={'default'}
      />
    ), [buns]
  );

  const renderBottomBun = React.useCallback(
    () => (
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
          price={0}
          thumbnail={''}
          extraClass={'default'}
        />
    ), [buns]
  );
  const renderIngredients = React.useCallback(
    () => (
      ingredients.length > 0 
      ? ingredients.map((item: TIngredient, index: number) => (
          <div className={`pr-2 ${burgerConstructorStyle.component}`} key={item.constructorId}>
            <BurgerConstructorIngredient index={index} item={item} deleteIngredient={() => dispatch(deleteIngredient(item))} moveIngredient={moveIngredient} />
          </div>
        )) 
      : <ConstructorElement
          type={undefined}
          text={'Выберите начинку'}
          price={0}
          thumbnail={''}
          extraClass={'default ml-8'}
        />
    ), [ingredients]
  );

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
                {getTotalPrice()}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={handleClick}>
              Оформить заказ
            </Button>
          </div>
      </section>
      { 
        isOrderRequest
          ? <Preloader />
          : isModalOpen && orderRequestSuccess &&
          <Modal 
            closeModal={(): void => {
              closeModal();
              dispatch(clearOrderData());
              dispatch(resetBurgerConstructor());
            }}
          >
            <OrderDetails />
          </Modal>
      }
    </>
  );
};

export default BurgerConstructor;