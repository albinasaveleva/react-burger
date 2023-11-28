import React, {FC} from 'react';
import ordersStyle from './orders.module.css';

import OrderCard from '../order-card/order-card';

const Orders: FC = () => {

  return (
    <div className={`pr-2 ${ordersStyle.container}`}>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />

    </div>
  )
}

export default Orders;