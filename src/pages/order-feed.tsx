import React, {FC} from 'react';
import OrderFeed from '../components/order-feed/order-feed';

import { useAppDispatch, useAppSelector } from '../services/store/store';
import { connectWSOrderFeed, disconnectWSOrderFeed } from '../services/orderFeed/actions';
import Preloader from '../components/preLoader/preloader';

const OrderFeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const connectStatus = useAppSelector((store) => store.orderFeed.status);
  const orders = useAppSelector((store) => store.orderFeed.orders);

  React.useEffect(
    () => {
      dispatch(connectWSOrderFeed())

      return () => {
        dispatch(disconnectWSOrderFeed())
      }
    }, []);
  return (
    <>
      {
        connectStatus !== 'ONLINE' || orders.length === 0
          ? <Preloader />
          : <OrderFeed />
      }
    </>
  )
}

export default OrderFeedPage;