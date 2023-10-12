import React from 'react';
import styles from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';

import AppHeader from '../app-header/app-header.jsx';
import Main from '../main/main';
import Preloader from '../preLoader/preloader';

import { getIngredients } from "../../services/burgerIngredients/actions";

function App() {
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getIngredients())
  }, [dispatch])

  const { isRequest } = useSelector(store => store.burgerIngredients);

  return (
    <div className={styles.app}>
      <AppHeader />
      {
        isRequest 
          ? <Preloader />
          : <Main />
      }
    </div>
  );
}

export default App;