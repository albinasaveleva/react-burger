import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from 'react-redux';


import mainStyle from './main.module.css';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Preloader from '../preLoader/preloader';

export default function Main() {
  const { isRequest } = useSelector(store => store.burgerIngredients);

  return ( 
    <>
      <AppHeader />
      {
        isRequest 
          ? <Preloader />
          : <main className={`pb-10 ${mainStyle.container}`}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor /> 
              </DndProvider>
            </main>
      }
    </>
  );
}