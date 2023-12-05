import React, {FC} from 'react';

import Preloader from '../components/preLoader/preloader';
import OrderInfo from '../components/order-info/order-info';

const OrderInfoPage: FC = () => {
  const isRequest = false;

  return (
    <>
      {
        isRequest
          ? <Preloader />
          : <OrderInfo />
      }
    </>
  )
  
}

export default OrderInfoPage;