import React, {FC} from 'react';

import OrderHistory from '../components/order-history/order-history';
import { useAppDispatch, useAppSelector } from '../services/store/store';
import { connectWSOrderHistory, disconnectWSOrderHistory } from '../services/orderHistory/actions';
import Preloader from '../components/preLoader/preloader';

const OrderHistoryPage: FC = () => {
  const dispatch = useAppDispatch();
  const connectStatus = useAppSelector((store) => store.orderHistory.status);
  const orders = useAppSelector((store) => store.orderHistory.orders);
  const ingredients = useAppSelector(store => store.burgerIngredients.list);

  React.useEffect(
    () => {
      dispatch(connectWSOrderHistory())

      return () => {
        dispatch(disconnectWSOrderHistory())
      }
    }, []);

  return (
    <>
      {
        connectStatus !== 'ONLINE' || !orders || ingredients.length === 0
          ? <Preloader />
          : <OrderHistory />
      }
    </>
  )
  
}

export default OrderHistoryPage;