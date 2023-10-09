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

import IngredientsCategory from "../ingredients-category/ingredients-category";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

// import { InView } from 'react-intersection-observer';

function BurgerIngredients() {
  const { isModalOpen, openModal, closeModal } = useModal();

  const { list: ingredients } = useSelector(store => store.ingredients);

  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const [currentTab, setCurrentTab] = React.useState('bun');
  const tabs = React.useMemo(()=> {
    return [
      { title: 'Булки', value: 'bun' },
      { title: 'Соусы', value: 'sauce' },
      { title: 'Начинки', value: 'main' },
    ]
  }, []);
  const tabScroll = React.useCallback(
    (e) => {
      setCurrentTab(e);
      document.getElementById(e).scrollIntoView({ behavior: "smooth" });
    }, []
  );
  const dispatch = useDispatch();
  const handleClick = React.useCallback(
    (e) => {
      const ingredientId = e.target.closest('.card').dataset.id;
      const currentIngredient = ingredients.filter(element => element._id === ingredientId)[0];
  
      dispatch({
        type: ADD_INGREDIENT_DETAILS,
        item: currentIngredient
      })
      openModal();
    }, [ingredients]
  )

  const renderTabs = React.useCallback(
    () => {
      return tabs.map(({title, value}) => {
        return (
          <Tab key={value} value={value} active={currentTab === value} onClick={tabScroll}>
            {title}
          </Tab>
        )
      })
    }, [tabs, currentTab]
  );
  const renderBunCategory = React.useCallback(
    () => {
      const buns = ingredients.filter(item => item.type === 'bun');
      return (
        <IngredientsCategory bunRef={bunRef} title={'Булки'} value={'bun'}>
          { buns.map(item => <BurgerIngredient handleClick={handleClick} key={item._id} item={item} />) }
        </IngredientsCategory>
      )
    }, [ingredients]
  );
  const renderMainCategory = React.useCallback(
    () => {
      const mains = ingredients.filter(item => item.type === 'main');
      return (
        <IngredientsCategory mainRef={mainRef} title={'Начинки'} value={'main'}>
          { mains.map(item => <BurgerIngredient handleClick={handleClick} key={item._id} item={item} />) }
        </IngredientsCategory>
      )
    }, [ingredients]
  );
  const renderSauceCategory = React.useCallback(
    () => {
      const sauces = ingredients.filter(item => item.type === 'sauce');
      return (
        <IngredientsCategory sauceRef={sauceRef} title={'Соусы'} value={'sauce'}>
          { sauces.map(item => <BurgerIngredient handleClick={handleClick} key={item._id} item={item} />) }
        </IngredientsCategory>
      )
    }, [ingredients]
  );

  return (
    <>
      <section className={`pt-10 ${burgerIngredientsStyle.container}`} id="burger-ingredients">
          <h2 className="mb-5 text text_type_main-large">Соберите бургер</h2>
          <div className={`mb-10 ${burgerIngredientsStyle.tabs}`}>
            { renderTabs() }
          </div>
          <div className={burgerIngredientsStyle.ingredients} id="burger-ingredients-content">
            { renderBunCategory() }
            { renderSauceCategory() }
            { renderMainCategory() }
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

// export default BurgerIngredients;
export default React.memo(BurgerIngredients);