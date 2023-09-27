import React from "react";
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';

import { 
  Box,
  Counter,
  CurrencyIcon, 
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from './card.module.css';

export default function Card(props) {
  return (
    <div className={`card ${cardStyle.card}`} data-id={props.item._id} key={props.item._id} onClick={props.onClick}>
    <div className={cardStyle.content}>
      <div className={`pb-1 ${cardStyle.illustration}`}>
        <img src={props.item.image} alt={props.item.name} />
      </div>
      <div  className={`pb-1 ${cardStyle.price}`}>
        <span className="pr-1 text text_type_digits-default">{props.item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`text text_type_main-default ${cardStyle.name}`}>{props.item.name}</span>
    </div>
    <div className="counter">
      <Counter count={1} size="default" />
    </div>
  </div>
  );
};

Card.propTypes = {
  item: ingredientType
};