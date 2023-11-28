import React, {FC} from 'react';

import { 
  CurrencyIcon, 
} from '@ya.praktikum/react-developer-burger-ui-components';

import orderInfoStyle from './order-info.module.css';


const OrderInfo: FC = () => {
  return (
    <div className={`pt-6 pr-6 pb-6 pl-6 ${orderInfoStyle.container}`}>
      <div className={`mb-15 ${orderInfoStyle.info}`}>
        <span className={`mb-6 text text_type_main-default ${orderInfoStyle.name}`}>Death Star Starship Main бургер</span>
        <span className={`text text_type_main-small ${orderInfoStyle.status}`}>Создан</span>
      </div>
      <div className={`mb-10 ${orderInfoStyle.ingredients}`}>
        <span className='mb-6 text text_type_main-default'>Состав:</span>
        <div className={`pr-6 ${orderInfoStyle.ingredientsList}`}>
          <div className={`${orderInfoStyle.ingredient}`}>
            <div className={`mr-4 ingredientPreview ${orderInfoStyle.ingredientImage}`}>
              <img src="" alt="" />
            </div>
            <span className="mr-4 text text_type_main-small">Флюоресцентная булка R2-D3</span>
            <div className={orderInfoStyle.ingredientPrice}>
              <span className='mr-4 text text_type_digits-default'>2 x 20</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <div className={`${orderInfoStyle.ingredient}`}>
            <div className={`mr-4 ingredientPreview ${orderInfoStyle.ingredientImage}`}>
              <img src="" alt="" />
            </div>
            <span className="mr-4 text text_type_main-small">Флюоресцентная булка R2-D3</span>
            <div className={orderInfoStyle.ingredientPrice}>
              <span className='mr-4 text text_type_digits-default'>2 x 20</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <div className={`${orderInfoStyle.ingredient}`}>
            <div className={`mr-4 ingredientPreview ${orderInfoStyle.ingredientImage}`}>
              <img src="" alt="" />
            </div>
            <span className="mr-4 text text_type_main-small">Флюоресцентная булка R2-D3</span>
            <div className={orderInfoStyle.ingredientPrice}>
              <span className='mr-4 text text_type_digits-default'>2 x 20</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
      <div className={`mb-6 ${orderInfoStyle.info}`}>
        <span className={`text text_type_main-small text_color_inactive ${orderInfoStyle.timestamp}`}>Сегодня, 16:20</span>
        <div className={orderInfoStyle.price}>
          <span className='mr-2 text text_type_digits-default'>480</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
  
}

export default OrderInfo;