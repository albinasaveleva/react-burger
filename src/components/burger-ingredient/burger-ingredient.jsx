import React from "react";
import { useDrag } from "react-dnd";

import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';

import { 
  Box,
  Counter,
  CurrencyIcon, 
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientStyle from './burger-ingredient.module.css';

function BurgerIngredient({item, handleClick}) {
  const [, dragRef] = useDrag({
    type: "burgerIngredient",
    item: {item}
  });

  const getCount = () => {
    return 1;
  }

  return (
    <div ref={dragRef} className={`card ${burgerIngredientStyle.card}`} data-id={item._id}  onClick={handleClick}>
    <div className={burgerIngredientStyle.content}>
      <div className={`mb-1 ${burgerIngredientStyle.illustration}`}>
        <img src={item.image} alt={item.name} />
      </div>
      <div  className={`mb-1 ${burgerIngredientStyle.price}`}>
        <span className="mr-1 text text_type_digits-default">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`text text_type_main-default ${burgerIngredientStyle.name}`}>{item.name}</span>
    </div>
    {
      getCount() 
      ? <div className="counter">
          <Counter count={getCount()} size="default" />
        </div>
      : null
    }
  </div>
  );
};

BurgerIngredient.propTypes = {
  item: ingredientType,
  handleClick: PropTypes.func.isRequired
};

// export default BurgerIngredient;
export default React.memo(BurgerIngredient);