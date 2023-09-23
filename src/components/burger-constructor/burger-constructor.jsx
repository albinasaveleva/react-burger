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

// export default function BurgerConstructor(props) {
export default function BurgerConstructor(props) {
  const { bun, main, sauce } = props.components.reduce((acc, item) => {
    const type = item.type;
    if (!Object.hasOwn(acc, type)) {
      acc[type] = [];
    };

    acc[type].push(item);
    return acc;
  }, {});


  return (
    <section className={`pt-25 pb-10 ${burgerConstructorStyle.container}`} id="burger-constructor">
      <div  className={`pl-4 ${burgerConstructorStyle.components}`}>
        <div className={`pb-4 pl-8 ${burgerConstructorStyle.topBun}`}>
          { <ConstructorElement
              type={'top'}
              isLocked={true}
              text={bun[0].name}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          }
        </div>
        <div className={burgerConstructorStyle.content}>
            { [...sauce, ...main].map((item) => {
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
            }) }
        </div>
        <div className={`pt-4 pl-8 ${burgerConstructorStyle.buttomBun}`}>
        { <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={bun[0].name}
            price={bun[0].price}
            thumbnail={bun[0].image}
          />
        }
      </div>
      </div>
      <div className={`pt-10 pb-10 pr-4 ${burgerConstructorStyle.info}`}>
        <div className={`pr-10 ${burgerConstructorStyle.price}`}>
          <span className="pr-1 text_type_digits-medium">
            610
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

const propsPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

BurgerConstructor.propTypes = {
  _id: propsPropTypes,
  name: propsPropTypes,
  type: propsPropTypes,
  proteins: propsPropTypes,
  fat: propsPropTypes,
  carbohydrates: propsPropTypes,
  calories: propsPropTypes,
  price: propsPropTypes,
  image: propsPropTypes,
  image_mobile: propsPropTypes,
  image_large: propsPropTypes,
  __v: propsPropTypes
};