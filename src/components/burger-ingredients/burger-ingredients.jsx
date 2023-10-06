import React, { useMemo } from "react";
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

import IngredientsCategory from "../ingredients-category/ingredients-category";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

// import { InView } from 'react-intersection-observer';

function BurgerIngredients(props) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { list: ingredients } = useSelector(store => store.ingredients);

  const sortedIngredients = useMemo(
    () => ingredients ? ingredients
      .reduce((acc, item) => {
        const type = item.type;
        if (!Object.hasOwn(acc, type)) {
          acc[type] = [];
        };
    
        acc[type].push(item);
        return acc;
      }, {})
    : {}, [ingredients])

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
            { tabs.map(({title, value}) => (
              <IngredientsCategory title={title} value={value}  key={value}>
                { sortedIngredients[value] && 
                  sortedIngredients[value]
                    .map(item => <BurgerIngredient handleClick={handleClick} key={item._id} item={item} />) 
                }
              </IngredientsCategory>
            )) }
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

export default BurgerIngredients;
// export default React.memo(BurgerIngredients);