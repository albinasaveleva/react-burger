import React from "react";
import PropTypes from 'prop-types';
import burgerConstructorStyle from './burger-constructor.module.css';
import { 
  Box,
  Button,
  ConstructorElement,
  CurrencyIcon, 
  DragIcon,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext, OrderContext, TotalPriceContext } from "../../services/mainContext";

export default function BurgerConstructor(props) {
  const { ingredients } = React.useContext(IngredientsContext);
  const { order, setOrder } = React.useContext(OrderContext);
  const { totalPrice, setTotalPrice } = React.useContext(TotalPriceContext);

  const url = 'https://norma.nomoreparties.space/api/orders';

  // React.useEffect(()=>{
  //   setOrder({
  //     buns: findIngredient('643d69a5c3f7b9001cfa093c'),
  //     ingredients: ingredients.filter( item => item.type === 'main' || item.type === 'sauce'),
  //   });
  // }, [ingredients]);

  React.useEffect(()=>{
    const ingredientsPrice = order.ingredients 
      ? order.ingredients.reduce((acc, item) => {
        acc += item.price;
        return acc;
      }, 0)
      : 0;
    const bunsPrice = order.buns ? order.buns.price * 2 : 0;

    setTotalPrice(ingredientsPrice + bunsPrice);
  }, [order.ingredients, order.buns]);

  const findIngredient = (id) => {
    const currentItem = ingredients.filter(item => item._id === id);
    return currentItem[0];
  }

  const sendOrder = () => {
    const body = {
      ingredients: [order.buns, ...order.ingredients]
    };
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Что-то пошло не так...');
        }
      })
      .then(({order: orderData, name}) => {
        setOrder({
          ...order,
          number: orderData.number,
          name: name,
        })
        openModal(orderData.number);
      })
      .catch(console.error);
  }

  const openModal = (number) => {
    props.openModal();
    props.setModalContent({
      title: '',
      component: 'OrderDetails',
      content: number,
    })
  };

  const renderTopBun = () => {
    return (
      order.buns   
        ? <ConstructorElement
            type={'top'}
            isLocked={true}
            text={`${order.buns.name} (верх)`}
            price={order.buns.price}
            thumbnail={order.buns.image}
          />
        : <ConstructorElement
          type={'top'}
          text={'Выберите булку'}
          extraClass={'default'}
        />
    )
  }

  const renderBottomBun = () => {
    return (
      order.buns 
        ? <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={`${order.buns.name} (низ)`}
            price={order.buns.price}
            thumbnail={order.buns.image}
          />
        :  <ConstructorElement
            type={'bottom'}
            text={'Выберите булку'}
            extraClass={'default'}
          />
    )
  }

  const renderIngredients = () => {
    return (
      order.ingredients 
        ? order.ingredients.map((item) => {
            return (
              <div className={`pr-2 ${burgerConstructorStyle.component}`} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  type={undefined}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  extraClass="ml-2"
                />
              </div>
            )
          }) 
        : <ConstructorElement
            type={undefined}
            text={'Выберите начинку'}
            extraClass={'default ml-8'}
          />
      )
    }

  return (
    <section className={`pt-25 ${burgerConstructorStyle.container}`} id="burger-constructor">
      <div  className={`ml-4 mb-10 ${burgerConstructorStyle.components}`}>
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
          <Button htmlType="button" type="primary" size="large" onClick={sendOrder}>
            Оформить заказ
          </Button>
        </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  setModalContent: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
};