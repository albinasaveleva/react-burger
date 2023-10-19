import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import { useDispatch } from 'react-redux';

import { ForgotPasswordPage, IngredientPage, LoginPage, MainPage, NonFound404Page, RegistrationPage, ResetPasswordPage, ProfilePage, TokenPage } from '../../pages';

import { getIngredients } from "../../services/burgerIngredients/actions";

function App() {
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ingredients" element={<IngredientPage />} />
          <Route path="/token" element={<TokenPage />} />
          <Route path="*" element={<NonFound404Page />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;