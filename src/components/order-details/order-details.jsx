import React from "react";
import orderDetailsStyle from './order-details.module.css';
import { 
  Box,
  CheckMarkIcon,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

export default function OrderDetails() {
  const { info } = useSelector(store => store.order);

  return (
    <>
      { info 
        ? <div className={`pt-20 pb-20 ${orderDetailsStyle.details}`}>
          <p className="mb-8 text text_type_digits-large">{info.order.number}</p>
          <p className="mb-15 text text_type_main-medium">идентификатор заказа</p>
          <div className={`mb-15 ${orderDetailsStyle.done}`}>
            <CheckMarkIcon type="primary" />
          </div>
          <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
        : null
      }
    </>
  );
};