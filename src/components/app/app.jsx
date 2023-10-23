import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import { useDispatch } from 'react-redux';

import AppHeader from '../app-header/app-header';
import { ForgotPasswordPage, IngredientPage, LoginPage, MainPage, NonFound404Page, RegistrationPage, ResetPasswordPage, ProfilePage } from '../../pages';
import { ProtectedRouteElement } from '../protected-roure-element/protected-route-element';

import { getIngredients } from "../../services/burgerIngredients/actions";
import { getCookie } from '../../utils/cookies';
import { getUser } from '../../services/auth/actions';

function App() {
  const dispatch = useDispatch();

  React.useEffect(()=> {
    dispatch(getIngredients());
    if (getCookie('accessToken')) {
      dispatch(getUser())
    }
  }, [dispatch])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={
          <ProtectedRouteElement onlyUnAuth>
            <LoginPage />
          </ProtectedRouteElement>
        } />
        <Route path="/register" element={
          <ProtectedRouteElement onlyUnAuth>
            <RegistrationPage />
          </ProtectedRouteElement>
        } />
        <Route path="/forgot-password" element={
          <ProtectedRouteElement onlyUnAuth>
            <ForgotPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route path="/reset-password" element={
          <ProtectedRouteElement onlyUnAuth>
            <ResetPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route path="/profile" element={
          <ProtectedRouteElement>
            <ProfilePage />
          </ProtectedRouteElement>
        } />
        <Route path="/ingredients" element={<IngredientPage />} />
        <Route path="*" element={<NonFound404Page />} />
      </Routes>
    </div>
  );
}

export default App;