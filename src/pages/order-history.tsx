import React, {FC} from 'react';

import Preloader from '../components/preLoader/preloader';
import OrderHistory from '../components/order-history/order-history';

const OrderHistoryPage: FC = () => {
  const isRequest = false;

  return (
    <>
      {
        isRequest
          ? <Preloader />
          : <OrderHistory />
      }
    </>
  )
  
}

export default OrderHistoryPage;