import React from 'react'
import { Link } from "react-router-dom";

import { 
  Box,
  BurgerIcon, 
  Logo,
  ListIcon, 
  ProfileIcon,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function NonFound404Page() {
  return (
    <>
      <p className="mb-5 mt-30 text text_type_digits-large">404</p>
      <p className="mb-5 text text_type_main-large">
        Страница не найдена
      </p>
      <Link to={'/'}>
        <p className="text text_type_main-default text_color_inactive">
          Вернуться на главную страницу
        </p>      
      </Link>
    </>
  )
}
