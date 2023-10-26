import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Preloader from '../components/preLoader/preloader';
import NonFound404Page from './non-found-404';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

import { 
  Box,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientPage() {
  const { id } = useParams();
  const isRequest = useSelector(store => store.burgerIngredients.isRequest);
  const ingredients = useSelector(store => store.burgerIngredients.list);

  const renderIngredient = () => {
    const ingredient = ingredients.filter(item => item._id === id)[0];

    if (!ingredient) {
      return <NonFound404Page />
    }

    return (
      <div className='mt-20 mb-20'>
        <IngredientDetails />
      </div>
    )
  }

  return ( 
    <>
      {
        isRequest
          ? <Preloader />
          : ingredients.length > 0 && renderIngredient()
      }
    </>
  )
}
