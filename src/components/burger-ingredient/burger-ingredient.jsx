import React from "react";
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { addIngredienDetails } from "../../services/ingredientDetails/actions";

import ingredientType from '../../utils/types';

import { 
  Box,
  Counter,
  CurrencyIcon, 
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientStyle from './burger-ingredient.module.css';

function BurgerIngredient({item}) {
  const buns = useSelector(store => store.burgerConstructor.buns);
  const ingredients = useSelector(store => store.burgerConstructor.ingredients);

  const dispatch = useDispatch();


  const getCount = () => {
    if (item.type === 'bun') {
      if (!buns) return 0;

      return buns._id === item._id ? 1 : 0;
    } else {
      if (ingredients.length === 0) return 0;
    }

      return ingredients
        .filter(ingredient => ingredient._id === item._id)
        .length
  };

  const [, dragRef] = useDrag({
    type: "burgerIngredient",
    item: {item}
  });
  let location = useLocation();

  return (
    <Link to={`/ingredients/${item._id}`} state = {{ backgroundLocation: location }}>
    <div ref={dragRef} className={`card ${burgerIngredientStyle.card}`} data-id={item._id}  onClick={()=>{dispatch(addIngredienDetails(item))}}>
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
      getCount() > 0 
      ? <div className="counter">
          <Counter count={getCount()} size="default" />
        </div>
      : null
    }
  </div>
  </Link>
  );
};

BurgerIngredient.propTypes = {
  item: ingredientType,
};

// export default BurgerIngredient;
export default React.memo(BurgerIngredient);