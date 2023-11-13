import React, {FC} from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from '../../hooks/hook';

import mainStyle from './main.module.css';

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Preloader from '../preLoader/preloader';

import { TStore } from "../../utils/types";

const Main: FC = () => {
  const isRequest = useAppSelector((store: TStore) => store.burgerIngredients.isRequest);
  const isGetUserRequest = useAppSelector((store: TStore) => store.auth.isGetUserRequest);

  return ( 
    <>
      {
        isRequest || isGetUserRequest
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

export default Main;