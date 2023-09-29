import React from "react";
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import ingredientDetailsStyle from './ingredient-details.module.css';
import { 
  Box,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientDetails(props) {
  const ingredient = props.content;
  
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
  );
};

IngredientDetails.propTypes = {
  content: ingredientType
};