import React from "react";
import { useParams } from 'react-router-dom';

import ingredientDetailsStyle from './ingredient-details.module.css';

import { 
  Box,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from 'react-redux';

import Preloader from "../preLoader/preloader";

function IngredientDetails() {
  const { id } = useParams();
  const isRequest = useSelector(store => store.burgerIngredients.isRequest);
  const ingredients = useSelector(store => store.burgerIngredients.list);

  const ingredient = useSelector(store => store.ingredientDetails.item);

  const renderIngredient = (ingredient) => {
    return (
      <div className={`pb-5 ${ingredientDetailsStyle.details}`}>
        <img className={`mb-4 ${ingredientDetailsStyle.illustration}`} src={ingredient.image} alt={ingredient.name} />
        <span className={`mb-8 text text_type_main-medium ${ingredientDetailsStyle.name}`}>{ingredient.name}</span>
        <div className={ingredientDetailsStyle.info}>
          <div className={ingredientDetailsStyle.item}>
            <span className='mb-2 text text_type_main-default text_color_inactive'>Калории, ккал</span>
            <span className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</span>
          </div>
          <div className={ingredientDetailsStyle.item}>
            <span className='mb-2 text text_type_main-default text_color_inactive'>Белки, г</span>
            <span className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</span>
          </div>
          <div className={ingredientDetailsStyle.item}>
            <span className='mb-2 text text_type_main-default text_color_inactive'>Жиры, г</span>
            <span className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</span>
          </div>
          <div className={ingredientDetailsStyle.item}>
            <span className='mb-2 text text_type_main-default text_color_inactive'>Углеводы, г</span>
            <span className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</span>
          </div>
        </div>
      </div>
    )
  };

  const getIngredient = () => {
    const item = ingredients.filter(item => item._id === id)[0];
    return renderIngredient(item)
  };

  return (
    <>
      {
        ingredient 
          ? renderIngredient(ingredient)
          : isRequest
            ? <Preloader />
            : ingredients.length > 0 && getIngredient()
      }
    </>
  );
};

export default IngredientDetails;
// export default React.memo(IngredientDetails);