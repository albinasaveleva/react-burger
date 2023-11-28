import React, {FC} from 'react';
import orderCardStyle from './order-card.module.css';

import { 
  CurrencyIcon, 
} from '@ya.praktikum/react-developer-burger-ui-components';

// type TComponentProps = {
//   item: TOrder,
// }

const OrderCard: FC = () => {

  return (
    <div className={`pt-6 pr-6 pb-6 pl-6 ${orderCardStyle.container}`}>
      <div className={`mb-6 ${orderCardStyle.info}`}>
        <span className={`text text_type_digits-default ${orderCardStyle.id}`}>#034535</span>
        <span className={`text text_type_main-small text_color_inactive ${orderCardStyle.timestamp}`}>Сегодня, 16:20</span>
      </div>
      <div className={`mb-6 ${orderCardStyle.info}`}>
        <span className={`text text_type_main-default ${orderCardStyle.name}`}>Death Star Starship Main бургер</span>
        <span className={`mt-2 text text_type_main-small ${orderCardStyle.status}`}>Создан</span>
      </div>
      <div className={orderCardStyle.info}>
        <div className={`mr-6 ${orderCardStyle.ingredients}`}>
          <div className={`ingredientPreview ${orderCardStyle.ingredient}`}>
            <img src="" alt="" />
          </div>
          <div className={`ingredientPreview ${orderCardStyle.ingredient}`}>
            <img src="" alt="" />
          </div>
          <div className={`ingredientPreview ${orderCardStyle.ingredient}`}>
            <img src="" alt="" />
          </div>
          <div className={`ingredientPreview ${orderCardStyle.ingredient}`}>
            <img src="" alt="" />
          </div>
        </div>
        <div className={orderCardStyle.price}>
          <span className='mr-2 text text_type_digits-default'>480</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderCard;