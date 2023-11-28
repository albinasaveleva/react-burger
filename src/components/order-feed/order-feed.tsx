import React, {FC} from 'react';

import orderFeedStyle from './order-feed.module.css';

import Orders from '../orders/orders';
import OrderStats from '../order-stats/order-stats';

const OrderFeed: FC = () => {
  return (
    <section className={`pb-10 pt-10 ${orderFeedStyle.container}`}>
      <h2 className="mb-6 text text_type_main-large">Лента заказов</h2>
      <div className={orderFeedStyle.content}>
        <Orders />
        <OrderStats />
      </div>
    </section>
  )
  
}

export default OrderFeed;