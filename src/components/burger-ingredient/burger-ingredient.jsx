import React from "react";
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';


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
  const { buns, ingredients } = useSelector(store => store.burgerConstructor);
  const [ count, setCount ] = React.useState(0);

  React.useEffect(()=>{
    if (item.type === 'bun') {
      if (!buns) {
        setCount(0);
        return;
      };

      buns._id === item._id ? setCount(1) : setCount(0);
    } else {
      if (ingredients.length === 0) {
        setCount(0);
        return;
      }

      const items = ingredients.filter(ingredient => ingredient._id === item._id);
      setCount(items.length);
    }
  }, [buns, ingredients]);

  const [, dragRef] = useDrag({
    type: "burgerIngredient",
    item: {item}
  });

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
      count > 0 
      ? <div className="counter">
          <Counter count={count} size="default" />
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