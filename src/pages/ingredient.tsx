import React, {FC} from 'react';
import { useParams } from 'react-router-dom';

import Preloader from '../components/preLoader/preloader';
import NonFound404Page from './non-found-404';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

import { useAppSelector } from '../hooks/hook';
import { TStore } from "../utils/types";

const IngredientPage: FC = () => {
  const { id } = useParams();
  const isRequest = useAppSelector((store: TStore) => store.burgerIngredients.isRequest);
  const ingredients = useAppSelector((store: TStore) => store.burgerIngredients.list);

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

export default IngredientPage;