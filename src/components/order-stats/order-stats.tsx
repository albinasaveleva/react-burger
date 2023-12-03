import React, {FC} from 'react';
import orderStatsStyle from './order-stats.module.css';
import { useAppSelector } from '../../services/store/store';
import { TOrder } from '../../types/data';

const sortArray = (array: [], size: number) => {
  let subarray = []; 
  for (let i = 0; i <Math.ceil(array.length/size); i++){
      subarray[i] = array.slice((i*size), (i*size) + size);
  }
  return subarray;
}

const OrderStats: FC = () => {
  const ordersDoneRef = React.useRef(null);

  const total = useAppSelector(store => store.orderFeed.total);
  const totalToday = useAppSelector(store => store.orderFeed.totalToday);
  const orders = useAppSelector(store => store.orderFeed.orders);

  const done = orders.filter((order: TOrder) => order.status === 'done');
  const renderDoneOrders = () => {
    const sortedDone = sortArray(done as [], 10);
    return sortedDone.map((column, index) => {
      return (
        <div key={index} className={orderStatsStyle.column}>
          { column.map((item: TOrder) =><span key={item._id} className='statusSuccess text text_type_digits-default'>{item.number}</span> ) }
        </div>
      )
    })
  }
  
  const inwork = orders.filter((order: TOrder) => order.status === 'pending');
  const renderInworkOrders = () => {
    const sortedDone = sortArray(inwork as [], 10);
    return sortedDone.map((column, index) => {
      return (
        <div key={index} className={orderStatsStyle.column}>
          { column.map((item: TOrder) =><span key={item._id} className='text text_type_digits-default'>{item.number}</span> ) }
        </div>
      )
    })
  }

  return (
    <div className={orderStatsStyle.container}>
      <div className={`mb-15 ${orderStatsStyle.board}`}>
        <div className={orderStatsStyle.status}>
          <span className="pb-6 text text_type_main-medium">Готовы:</span>
          <div ref={ordersDoneRef} className={orderStatsStyle.list}>
            {renderDoneOrders()}
          </div>
        </div>
        <div className={orderStatsStyle.status}>
          <span className="pb-6 text text_type_main-medium">В работе:</span>
          <div className={orderStatsStyle.list}>
            { renderInworkOrders() }
          </div>
        </div>
      </div>
      <div className={`mb-15 ${orderStatsStyle.completed}`}>
        <span className="pb-6 text text_type_main-medium">Выполнено за все время:</span>
        <p className="text-shadow text text_type_digits-large">{total}</p>
      </div>
      <div className={orderStatsStyle.completed}>
        <span className="pb-6 text text_type_main-medium">Выполнено за сегодня:</span>
        <p className="text-shadow text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  )
}

export default OrderStats;