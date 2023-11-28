import React, {FC} from "react";
import { useAppSelector } from '../hooks/hook';

import Preloader from "../components/preLoader/preloader";
import Main from "../components/main/main";

const MainPage: FC = () => {
  const isRequest = useAppSelector((store) => store.burgerIngredients.isRequest);
  const isGetUserRequest = useAppSelector((store) => store.auth.isGetUserRequest);

  return ( 
    <>
      {
        isRequest || isGetUserRequest
          ? <Preloader />
          : <Main/>
      }
    </>
  );
}

export default MainPage;