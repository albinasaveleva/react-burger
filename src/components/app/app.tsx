import React, {FC} from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store/store';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import { ForgotPasswordPage, IngredientPage, LoginPage, MainPage, NonFound404Page, OrderFeedPage, OrderHistoryPage, OrderInfoPage, ProfilePage, ProfileEditPage, RegistrationPage, ResetPasswordPage } from '../../pages';
import {ProtectedRouteElement} from '../protected-roure-element/protected-route-element';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { deleteIngredientDetails } from '../../services/ingredientDetails/actions';
import { getIngredients } from "../../services/burgerIngredients/actions";
import { getCookie } from '../../utils/cookies';
import { getUser } from '../../services/auth/actions';
import OrderInfo from '../order-info/order-info';

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
        <Route path="/feed">
          <Route index element={<OrderFeedPage />} />
          <Route path=":id" element={<OrderInfoPage />} />
        </Route>
        <Route path="/profile">
          <Route index element={
            <ProtectedRouteElement>
              <ProfilePage>
                <ProfileEditPage />
              </ProfilePage>
            </ProtectedRouteElement>
          } />
          <Route path="orders" element={
            <ProtectedRouteElement>
              <ProfilePage>
                <OrderHistoryPage />
              </ProfilePage>
            </ProtectedRouteElement>
          } />
          <Route path="orders/:id" element={
            <ProtectedRouteElement>
              <OrderInfoPage />
            </ProtectedRouteElement>
          } />
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
                navigate(-1)}} 
              title={'Детали ингредиента'}
            >
              <IngredientDetails />
            </Modal>
          } />
          <Route path="/feed/:id" element={
            <Modal 
              closeModal={() => {
                navigate(-1)
              } } 
              title={'id'}
            >
              <OrderInfo />
            </Modal>
          } />
          <Route path="/profile/orders/:id" element={
            <Modal 
              closeModal={() => {
                navigate(-1)
              }}
              title={'id'}
            >
              <OrderInfo />
            </Modal>
          } />
        </Routes>
      )}
    </div>
  );
}

export default App;