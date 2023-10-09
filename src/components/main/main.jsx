import React from "react";
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import mainStyle from './main.module.css';

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/ingredients/actions";

export default function Main() {
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getIngredients())
  }, [dispatch])

  return ( 
    <main className={`pb-10 ${mainStyle.container}`}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor /> 
      </DndProvider>
    </main>
  );
}