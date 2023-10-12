import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import mainStyle from './main.module.css';

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export default function Main() {
  return ( 
    <main className={`pb-10 ${mainStyle.container}`}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor /> 
      </DndProvider>
    </main>
  );
}