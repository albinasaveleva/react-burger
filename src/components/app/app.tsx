import React, {FC} from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import { ForgotPasswordPage, IngredientPage, LoginPage, MainPage, NonFound404Page, RegistrationPage, ResetPasswordPage, ProfilePage, ProfileEditPage } from '../../pages';
import {ProtectedRouteElement} from '../protected-roure-element/protected-route-element';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { deleteIngredientDetails } from '../../services/ingredientDetails/actions';
import { getIngredients } from "../../services/burgerIngredients/actions";
import { getCookie } from '../../utils/cookies';
import { getUser } from '../../services/auth/actions';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  React.useEffect(()=> {
    dispatch(getIngredients());

    if (getCookie('accessToken') && localStorage.getItem('refreshToken')) {
      dispatch(getUser())
    }
  }, [dispatch])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
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
        }>
          <Route index element={<ProfileEditPage />} />
          <Route path="orders" element={<div></div>} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NonFound404Page />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={
            <Modal 
              closeModal={() => { 
                dispatch(deleteIngredientDetails())
                navigate('/')}} 
              title={'Детали ингредиента'}
            >
              <IngredientDetails />
            </Modal>
          } />
        </Routes>
      )}
    </div>
  );
}

export default App;