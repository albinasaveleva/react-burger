import React, {FC} from "react";
import orderDetailsStyle from './order-details.module.css';
import { 
  CheckMarkIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/hook';

import { TStore } from "../../utils/types";

const OrderDetails: FC = () => {
  const info = useAppSelector((store: TStore) => store.orderDetails.info);

  return (
    <div className={`pt-20 pb-20 ${orderDetailsStyle.details}`}>
      <p className="mb-8 text text_type_digits-large">{info.number}</p>
      <p className="mb-15 text text_type_main-medium">идентификатор заказа</p>
      <div className={`mb-15 ${orderDetailsStyle.done}`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;