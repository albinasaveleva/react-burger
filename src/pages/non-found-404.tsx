import React, {FC} from 'react'
import { Link } from "react-router-dom";

const NonFound404Page: FC = () => {
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

export default NonFound404Page;