import React, {FC} from 'react';
import Orders from '../orders/orders';

import OrderHistoryStyle from './order-history.module.css';

const OrderHistory: FC = () => {
  return (
    <section className={OrderHistoryStyle.container}>
      <Orders />
    </section>
  )
}

export default OrderHistory;