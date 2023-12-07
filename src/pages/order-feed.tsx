import React, {FC} from 'react';
import OrderFeed from '../components/order-feed/order-feed';

import { useAppDispatch, useAppSelector } from '../services/store/store';
import { connectWSOrderFeed, disconnectWSOrderFeed } from '../services/orderFeed/actions';
import Preloader from '../components/preLoader/preloader';

const OrderFeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const connectStatus = useAppSelector((store) => store.orderFeed.status);
  const orders = useAppSelector((store) => store.orderFeed.orders);
  const ingredients = useAppSelector(store => store.burgerIngredients.list);

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
        connectStatus !== 'ONLINE' || !orders || ingredients.length === 0
          ? <Preloader />
          : <OrderFeed />
      }
    </>
  )
}

export default OrderFeedPage;