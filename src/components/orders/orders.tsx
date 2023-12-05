import React, {FC} from 'react';
import ordersStyle from './orders.module.css';

import OrderCard from '../order-card/order-card';
import { TOrder } from '../../types/data';

type TComponentProps = {
  orders: TOrder[],
};

const Orders: FC<TComponentProps> = ({orders}) => {
  return (
    <div className={`pr-2 ${ordersStyle.container}`}>
      { orders.map(order => <OrderCard key={order.number} order={order} />) }
    </div>
  )
}

export default Orders;