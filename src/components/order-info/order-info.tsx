import React, {FC} from 'react';

import { 
  CurrencyIcon, 
} from '@ya.praktikum/react-developer-burger-ui-components';

import orderInfoStyle from './order-info.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store/store';
import { getIngredient, getOrderApi } from '../../utils/burger-api';
import { TIngredient, TOrder } from '../../types/data';
import Preloader from '../preLoader/preloader';

const getTimestamp = (time: string) => {
  let timestamp = '';

  const date = new Date(time);
  const currentDate = new Date();
  let days = Math.round((Date.parse(currentDate.toString()) - Date.parse(date.toString()))/86400000);
  if (days === 0) {
    timestamp = `Сегодня, ${date.getHours()}:${date.getMinutes()}`;
  } else if (days === 1) {
    timestamp = `Вчера, ${date.getHours()}:${date.getMinutes()}`;
  } else if ( days === 2 || days === 3 || days === 4 ) {
    timestamp = `${days} дня назад, ${date.getHours()}:${date.getMinutes()}`;
  } else if (days === 5 || days === 6 || days === 7 || days === 8 || days === 9 || days === 10) {
    timestamp = `${days} дней назад, ${date.getHours()}:${date.getMinutes()}`;
  } else {
    timestamp = `Давно`;
  }

  return timestamp;
}

export const getOrderPrice = (orderIngredients: string[], ingredients: TIngredient[]) => {
  return orderIngredients.reduce((acc: number, ingredientId: string) => {
    const ingredient = getIngredient(ingredientId, ingredients);
    acc += ingredient.price;
    return acc;
  }, 0)
}

const OrderInfo: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  console.log(location)
  if (location.state?.backgroundLocation !== location.pathname) {
    location.state.backgroundLocation.pathname = location.pathname
  } 
  console.log(location)


  const [ order, setOrder ] = React.useState<null | TOrder>(null);
  const ingredients = useAppSelector(store => store.burgerIngredients.list);
  
  const getOrder = () => {
    getOrderApi(id as string)
      .then(({orders}) => {
        const item = orders[0];
        setOrder(item);
      })
  }

  React.useEffect(()=>{
    getOrder()
  }, [])

  const renderOrderStatus = (status: string) => {
    if (status === 'done') {
      return <span className={`statusSuccess text text_type_main-small ${orderInfoStyle.status}`}>{'Выполнен'}</span>
    } else if (status === 'pending') {
      return <span className={`text text_type_main-small ${orderInfoStyle.status}`}>{'Готовится'}</span>
    } else if ( status === 'created') {
      return <span className={`text text_type_main-small ${orderInfoStyle.status}`}>{'Создан'}</span>
    } else {
      return <span className={`statusCanceled text text_type_main-small ${orderInfoStyle.status}`}>{'Отменён'}</span>
    }
  }

  const renderIngredients = (orderIngredients: string[], ingredients: TIngredient[]) => {
    const sortedIngredients = () => {
      return orderIngredients.reduce((acc: { [key: string]: number }, item)=>{
        acc.hasOwnProperty(item) ? acc[item] = acc[item] + 1 : acc[item] = 1;
        return acc;
      }, {})
    }
    
    return Object.entries(sortedIngredients()).map(([key, value], index) => {
      const ingredient = getIngredient(key, ingredients);

      return (
        <div key={index} className={`${orderInfoStyle.ingredient}`}>
          <div className={`mr-4 ingredientPreview ${orderInfoStyle.ingredientImage}`}>
            <img src={ingredient.image_mobile} alt="" />
          </div>
          <span className="mr-4 text text_type_main-small">{ingredient.name}</span>
          <div className={orderInfoStyle.ingredientPrice}>
            <span className='mr-4 text text_type_digits-default'>{`${value} x ${ingredient.price}`}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      )
    })
  }

  const renderOrderInfo = () => {
    return order && (
      <div className={`pt-6 pr-6 pb-6 pl-6 ${orderInfoStyle.container}`}>
        <div className={`mb-15 ${orderInfoStyle.info}`}>
          <span className={`mb-6 text text_type_main-default ${orderInfoStyle.name}`}>{order.name}</span>
          {renderOrderStatus(order.status)}
        </div>
        <div className={`mb-10 ${orderInfoStyle.ingredients}`}>
          <span className='mb-6 text text_type_main-default'>Состав:</span>
          <div className={`pr-6 ${orderInfoStyle.ingredientsList}`}>
            { renderIngredients(order.ingredients, ingredients) }
          </div>
        </div>
        <div className={`mb-6 ${orderInfoStyle.info}`}>
          <span className={`text text_type_main-small text_color_inactive ${orderInfoStyle.timestamp}`}>{getTimestamp(order.createdAt)}</span>
          <div className={orderInfoStyle.price}>
            <span className='mr-2 text text_type_digits-default'>{getOrderPrice(order.ingredients, ingredients)}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    )
  }

  return (
    order && ingredients
      ? renderOrderInfo()
      : <Preloader />
  )
  
}

export default OrderInfo;