import React, {FC} from 'react';
import { Link, useLocation } from "react-router-dom";

import orderCardStyle from './order-card.module.css';

import { 
  CurrencyIcon, 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, TOrder } from '../../types/data';
import { useAppSelector } from '../../services/store/store';
import { getIngredient } from '../../utils/burger-api';

type TComponentProps = {
  order: TOrder,
}

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

const OrderCard: FC<TComponentProps> = ({order}) => {
  const ingredients = useAppSelector(store => store.burgerIngredients.list);
  const location = useLocation();

  const renderOrderStatus = (status: string) => {
    if (status === 'done') {
      return <span className={`statusSuccess mt-2 text text_type_main-small ${orderCardStyle.status}`}>{'Выполнен'}</span>
    } else if (status === 'pending') {
      return <span className={`mt-2 text text_type_main-small ${orderCardStyle.status}`}>{'Готовится'}</span>
    } else if ( status === 'created') {
      return <span className={`mt-2 text text_type_main-small ${orderCardStyle.status}`}>{'Создан'}</span>
    } else {
      return <span className={`statusCanceled mt-2 text text_type_main-small ${orderCardStyle.status}`}>{'Отменён'}</span>
    }
  }

  const renderIngredients = (order: TOrder, ingredients: TIngredient[]) => {
    if (ingredients.length > 6) {
      return order.ingredients.map((ingredient, index) => {
        if (index < 5) {
          return (
            <div key={`${order.number}_${index}`} className={`ingredientPreview ${orderCardStyle.ingredient}`}>
              <img src={getIngredient(ingredient, ingredients).image_mobile} alt="" />
            </div>
          )
        } else if (index === 5) {
          const moreCount = ingredients.length - 6;
          return (
            <div key={`${order.number}_${index}`} className={`ingredientPreview ${orderCardStyle.ingredient}`}>
              <img src={getIngredient(ingredient, ingredients).image_mobile} alt="" />
              <div className={`text text_type_digits-default ${orderCardStyle.ingredientMore}`}>{`+${moreCount}`}</div>
            </div>
          )
        } else {
          return null;
        }
      })
    } else {
      return order.ingredients.map((ingredient, index) => {
        return (
          <div key={`${order.number}_${index}`} className={`ingredientPreview ${orderCardStyle.ingredient}`}>
            <img src={getIngredient(ingredient, ingredients).image_mobile} alt="" />
          </div>
        )
      })
    }
  }
  
  return (
    <Link to={`${order.number}`} state = {{ backgroundLocation: location }}>
        <div className={`pt-6 pr-6 pb-6 pl-6 ${orderCardStyle.container}`}>
      <div className={`mb-6 ${orderCardStyle.info}`}>
        <span className={`text text_type_digits-default ${orderCardStyle.id}`}>{`#${order.number}`}</span>
        <span className={`text text_type_main-small text_color_inactive ${orderCardStyle.timestamp}`}>{getTimestamp(order.createdAt)}</span>
      </div>
      <div className={`mb-6 ${orderCardStyle.info}`}>
        <span className={`text text_type_main-default ${orderCardStyle.name}`}>{order.name}</span>
        { 
          location.pathname === '/profile/orders' && renderOrderStatus(order.status)
        }
        
      </div>
      <div className={orderCardStyle.info}>
        <div className={`mr-6 ${orderCardStyle.ingredients}`}>
          { renderIngredients(order, ingredients) }
        </div>
        <div className={orderCardStyle.price}>
          <span className='mr-2 text text_type_digits-default'>{getOrderPrice(order.ingredients, ingredients)}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
    </Link>
  )
}

export default OrderCard;