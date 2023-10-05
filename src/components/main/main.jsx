import React from "react";
import mainStyle from './main.module.css';
import { useSelector, useDispatch } from 'react-redux';


import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/ingredients";

export default function Main() {
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getIngredients())
  }, [dispatch])

  return ( 
    <main className={`pb-10 ${mainStyle.container}`}>
      <BurgerIngredients />
      <BurgerConstructor /> 
    </main>
  );
}