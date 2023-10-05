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
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from "../../services/actions/order";


export default function BurgerConstructor(props) {
  const { buns, ingredients } = useSelector(store => store.burgerConstructor)
  const [totalPrice, setTotalPrice] = React.useState(0);

  const url = 'https://norma.nomoreparties.space/api/orders';

  React.useEffect(()=>{
    const ingredientsPrice = 120;
    const bunsPrice = 300;

    setTotalPrice(ingredientsPrice + bunsPrice)
  }, [buns, ingredients]);

  // const findIngredient = (id) => {
  //   const currentItem = ingredients.filter(item => item._id === id);
  //   return currentItem[0];
  // }
  const dispatch = useDispatch();
  const sendOrder = () => {  
    dispatch(createOrder(['643d69a5c3f7b9001cfa093c']));
    openModal();
  }

  const openModal = () => {
    props.openModal();
    props.setModalContent({
      title: '',
      component: 'OrderDetails',
    })
  };

  const renderTopBun = () => {
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
  }

  const renderBottomBun = () => {
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
  }

  const renderIngredients = () => {
    return (
      ingredients 
        ? ingredients.map((item) => {
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
//totalPrice высчитывается не надо в стор