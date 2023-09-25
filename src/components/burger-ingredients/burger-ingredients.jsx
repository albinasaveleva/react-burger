import React from "react";
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';


import burgerIngredientsStyle from './burger-ingredients.module.css';
import { 
  Box,
  Tab,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import Card from "../card/card";
import Cards from "../cards/cards";

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('bun');

  const ingredients = props.ingredients.reduce((acc, item) => {
    const type = item.type;
    if (!Object.hasOwn(acc, type)) {
      acc[type] = [];
    };

    acc[type].push(item);
    return acc;
  }, {});

  const tabs = [
    { title: 'Булки', value: 'bun' },
    { title: 'Соусы', value: 'sauce' },
    { title: 'Начинки', value: 'main' },
  ];

  const tabScroll = (e) => {
    setCurrent(e);
    document.getElementById(e).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className={`pt-10 ${burgerIngredientsStyle.container}`} id="burger-ingredients">
      <h2 className="pb-5 text text_type_main-large">Соберите бургер</h2>
      <div className={`pb-10 ${burgerIngredientsStyle.tabs}`}>
        { tabs.map(({title, value}) => {
          return (
            <Tab key={value} value={value} active={current === value} onClick={tabScroll}>
              {title}
            </Tab>
          )
        }) }
      </div>
      <div className={burgerIngredientsStyle.ingredients}>
        { tabs.map(({title, value}) => {
            return (
              <div className={burgerIngredientsStyle.tabContent} id={value} key={value}>
                <h3 className="text text_type_main-medium">
                  {title}
                </h3>
                <Cards>
                  { ingredients[value].map(item => <Card key={item._id} item={item} />) }
                </Cards>
            </div>
            )
          }) }
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType)
};