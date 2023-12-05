import React, {FC} from 'react';
import Orders from '../orders/orders';

import OrderHistoryStyle from './order-history.module.css';
import { useAppSelector } from '../../services/store/store';

const OrderHistory: FC = () => {
  const orders = useAppSelector(store => store.orderHistory.orders);
  const reverseOrders = [...orders].reverse();
  return (
    <section className={`pb-10 ${OrderHistoryStyle.container}`}>
      <Orders orders={reverseOrders} />
    </section>
  )
}

export default OrderHistory;