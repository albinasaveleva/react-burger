import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ADD_INGREDIENT_DETAILS } from "../../services/actions/burgerIngredients";
import { 
  Box,
  Tab,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyle from './burger-ingredients.module.css';

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import useModal from '../../hooks/useModal';

import Card from "../card/card";
import Cards from "../cards/cards";

import { InView } from 'react-intersection-observer';

export default function BurgerIngredients(props) {
  const { isModalOpen, openModal, closeModal } = useModal();

  const { list: ingredients } = useSelector(store => store.ingredients);
  const sortedIngredients = ingredients 
    ? ingredients.reduce((acc, item) => {
      const type = item.type;
      if (!Object.hasOwn(acc, type)) {
        acc[type] = [];
      };

      acc[type].push(item);
      return acc;
    }, {})
    : {};

  const tabs = [
    { title: 'Булки', value: 'bun' },
    { title: 'Соусы', value: 'sauce' },
    { title: 'Начинки', value: 'main' },
  ];
  const [currentTab, setCurrentTab] = React.useState('bun');
  const tabScroll = (e) => {
    setCurrentTab(e);
    document.getElementById(e).scrollIntoView({ behavior: "smooth" });
  }

  const dispatch = useDispatch();
  const handleClick = (e) => {
    const ingredientId = e.target.closest('.card').dataset.id;
    const currentIngredient = ingredients.filter(element => element._id === ingredientId)[0];

    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      item: currentIngredient
    })
    openModal();
  }

  return (
    <>
      <section className={`pt-10 ${burgerIngredientsStyle.container}`} id="burger-ingredients">
          <h2 className="mb-5 text text_type_main-large">Соберите бургер</h2>
          <div className={`mb-10 ${burgerIngredientsStyle.tabs}`}>
            { tabs.map(({title, value}) => {
              return (
                <Tab key={value} value={value} active={currentTab === value} onClick={tabScroll}>
                  {title}
                </Tab>
              )
            }) }
          </div>
          <div className={burgerIngredientsStyle.ingredients} id="burger-ingredients-content">
            { tabs.map(({title, value}) => {
                return (
                  <InView  key={value} >
                    {({ ref, inView, entry }) => (
                      <div className={burgerIngredientsStyle.tabContent} id={value} ref={ref} data-top-position={''} data-inview={inView}>
                          <h3 className="text text_type_main-medium">
                            {title}
                          </h3>
                          <Cards>
                            { sortedIngredients[value] && sortedIngredients[value].map(item => <Card onClick={handleClick} key={item._id} item={item} />) }
                          </Cards>
                      </div>
                    )}
                  </InView>
                )
              }) }
          </div>
      </section>
      {
        isModalOpen && 
        <Modal closeModal={closeModal} title={'Детали ингредиента'}>
          <IngredientDetails />
        </Modal>
      }
    </>
  );
};