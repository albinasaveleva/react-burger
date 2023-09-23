import React from "react";
import PropTypes from 'prop-types';
import { 
  Box,
  Counter,
  CurrencyIcon, 
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from './card.module.css';

export default function Card(props) {
  return (
    <div className={cardStyle.card} key={props.item._id}>
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

const propsPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

Card.propTypes = {
  _id: propsPropTypes,
  name: propsPropTypes,
  type: propsPropTypes,
  proteins: propsPropTypes,
  fat: propsPropTypes,
  carbohydrates: propsPropTypes,
  calories: propsPropTypes,
  price: propsPropTypes,
  image: propsPropTypes,
  image_mobile: propsPropTypes,
  image_large: propsPropTypes,
  __v: propsPropTypes
};