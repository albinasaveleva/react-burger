import React, {FC} from 'react';
import orderStatsStyle from './order-stats.module.css';

const OrderStats: FC = () => {
  return (
    <div className={orderStatsStyle.container}>
      <div className={`mb-15 ${orderStatsStyle.board}`}>
        <div className={orderStatsStyle.status}>
          <span className="pb-6 text text_type_main-medium">Готовы:</span>
          <div className={orderStatsStyle.list}>
            <span className='text text_type_digits-default'>034533</span>
            <span className='text text_type_digits-default'>034533</span>
            <span className='text text_type_digits-default'>034533</span>
            <span className='text text_type_digits-default'>034533</span>
            <span className='text text_type_digits-default'>034533</span>
          </div>
        </div>
        <div className={orderStatsStyle.status}>
          <span className="pb-6 text text_type_main-medium">В работе:</span>
          <div className={orderStatsStyle.list}>
            <span className='text text_type_digits-default'>034533</span>
            <span className='text text_type_digits-default'>034533</span>
            <span className='text text_type_digits-default'>034533</span>
            <span className='text text_type_digits-default'>034533</span>
            <span className='text text_type_digits-default'>034533</span>
          </div>
        </div>
      </div>
      <div className={`mb-15 ${orderStatsStyle.completed}`}>
        <span className="pb-6 text text_type_main-medium">Выполнено за все время:</span>
        <p className="text-shadow text text_type_digits-large">1234567890</p>
      </div>
      <div className={orderStatsStyle.completed}>
        <span className="pb-6 text text_type_main-medium">Выполнено за сегодня:</span>
        <p className="text-shadow text text_type_digits-large">1234567890</p>
      </div>
    </div>
  )
}


export default OrderStats;