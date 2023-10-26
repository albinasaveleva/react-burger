import React from "react";
import { useSelector } from 'react-redux';
import { useInView } from "react-intersection-observer";

import { 
  Box,
  Tab,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyle from './burger-ingredients.module.css';

import IngredientsCategory from "../ingredients-category/ingredients-category";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import { getBurgerIngredients } from "../../services/burgerIngredients/selectors";

function BurgerIngredients() {
  const ingredients = useSelector(getBurgerIngredients);
  const rootContainerRef = React.useRef(null);
  const [currentTab, setCurrentTab] = React.useState('bun');
  const tabs = React.useMemo(()=> {
    return [
      { title: 'Булки', value: 'bun' },
      { title: 'Соусы', value: 'sauce' },
      { title: 'Начинки', value: 'main' },
    ]
  }, []);

  const [bunref, bunInView, bunEntry] = useInView({
    threshold: 0,
    root: rootContainerRef.current,
  });
  const [sauceref, sauceInView, sauceEntry] = useInView({
    threshold: 0,
    root: rootContainerRef.current,
  });
  const [mainref, mainInView, mainEntry] = useInView({
    threshold: 0,
    root: rootContainerRef.current,
  });

  React.useEffect(()=>{
    if (bunEntry && sauceEntry && mainEntry) {
      checkCurrentTab();
    }
    
  }, [bunInView, sauceInView, mainInView, bunEntry, sauceEntry, mainEntry]);

  const tabScroll = React.useCallback(
    (e) => {
      document.getElementById(e).scrollIntoView({ block: "start", behavior: "smooth" });
    }, []
  );
  const checkCurrentTab = () => {
    const tabsInfo = [
      {
        name: 'bun',
        isVisible: bunInView,
        top: bunEntry,
      },
      {
        name: 'sauce',
        isVisible: sauceInView,
        top: sauceEntry,
      },
      {
        name: 'main',
        isVisible: mainInView,
        top: mainEntry,
      },
    ];

    const visibleTabs = tabsInfo
      .filter(tab => tab.isVisible === true)
      .sort(function (a, b) {
        if (a.top > b.top) {
          return 1;
        }
        if (a.top < b.top) {
          return -1;
        }
        return 0;
      });

    setCurrentTab(visibleTabs[0].name);
  }
  
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
          <IngredientsCategory ref={bunref} title={'Булки'} value={'bun'}>
            { buns.map(item => <BurgerIngredient key={item._id} item={item} />) }
          </IngredientsCategory>
        )
    }, [ingredients, bunref]
  );
  const renderMainCategory = React.useCallback(
    () => {
      const mains = ingredients.filter(item => item.type === 'main');
      return (
        <IngredientsCategory ref={mainref} title={'Начинки'} value={'main'}>
          { mains.map(item => <BurgerIngredient key={item._id} item={item} />) }
        </IngredientsCategory>
      )
    }, [ingredients, mainref]
  );
  const renderSauceCategory = React.useCallback(
    () => {
      const sauces = ingredients.filter(item => item.type === 'sauce');
      return (
        <IngredientsCategory ref={sauceref} title={'Соусы'} value={'sauce'}>
          { sauces.map(item => <BurgerIngredient key={item._id} item={item} />) }
        </IngredientsCategory>
      )
    }, [ingredients, sauceref]
  );

  return (
    <>
      <section className={`pt-10 ${burgerIngredientsStyle.container}`} id="burger-ingredients">
          <h2 className="mb-5 text text_type_main-large">Соберите бургер</h2>
          <div className={burgerIngredientsStyle.tabs}>
            { renderTabs() }
          </div>
          <div ref={rootContainerRef}  className={`pt-10 ${burgerIngredientsStyle.ingredients}`} id="burger-ingredients-content">
            { renderBunCategory() }
            { renderSauceCategory() }
            { renderMainCategory() }
          </div>
      </section>
    </>
  );
};

export default React.memo(BurgerIngredients);