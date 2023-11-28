import React, {FC} from "react";
import { useDrag } from "react-dnd";
import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { Link, useLocation } from "react-router-dom";
import { addIngredienDetails } from "../../services/ingredientDetails/actions";

import { 
  Counter,
  CurrencyIcon, 
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientStyle from './burger-ingredient.module.css';

import { TIngredient } from "../../types/data";
type TComponentProps = {
  item: TIngredient,
};

const BurgerIngredient: FC<TComponentProps> = ({item}) => {
  const buns = useAppSelector((store) => store.burgerConstructor.buns);
  const ingredients = useAppSelector((store) => store.burgerConstructor.ingredients);

  const dispatch = useAppDispatch();

  const getCount = (): number => {
    if (item.type === 'bun') {
      if (!buns) return 0;

      return buns._id === item._id ? 1 : 0;
    } else {
      if (ingredients.length === 0) return 0;
    }

      return (ingredients as TIngredient[])
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
      <div ref={dragRef} className={`card ${burgerIngredientStyle.card}`} onClick={()=>{dispatch(addIngredienDetails(item))}}>
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

export default BurgerIngredient;