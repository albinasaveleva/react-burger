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
import { FORGOT_PASSWORD_ROUTE, INDEX_ROUTE, INGREDIENTS_ROUTE, LOGIN_ROUTE, NON_FOUND_ROUTE, ORDER_FEED_ID_MODAL_ROUTE, ORDER_FEED_ID_ROUTE, ORDER_FEED_ROUTE, ORDER_HISTORY_ID_MODAL_ROUTE, ORDER_HISTORY_ID_ROUTE, ORDER_HISTORY_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, RESET_PASSWORD_ROUTE } from '../../utils/burger-api';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  console.log(location)

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
        <Route path={INDEX_ROUTE} element={<MainPage />} />
        <Route path={LOGIN_ROUTE} element={
          <ProtectedRouteElement onlyUnAuth>
            <LoginPage />
          </ProtectedRouteElement>
        } />
        <Route path={REGISTER_ROUTE} element={
          <ProtectedRouteElement onlyUnAuth>
            <RegistrationPage />
          </ProtectedRouteElement>
        } />
        <Route path={FORGOT_PASSWORD_ROUTE} element={
          <ProtectedRouteElement onlyUnAuth>
            <ForgotPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route path={RESET_PASSWORD_ROUTE} element={
          <ProtectedRouteElement onlyUnAuth>
            <ResetPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route path={ORDER_FEED_ROUTE}>
          <Route index element={<OrderFeedPage />} />
          <Route path={ORDER_FEED_ID_ROUTE} element={<OrderInfoPage />} />
        </Route>
        <Route path={PROFILE_ROUTE}>
          <Route index element={
            <ProtectedRouteElement>
              <ProfilePage>
                <ProfileEditPage />
              </ProfilePage>
            </ProtectedRouteElement>
          } />
          <Route path={ORDER_HISTORY_ROUTE} element={
            <ProtectedRouteElement>
              <ProfilePage>
                <OrderHistoryPage />
              </ProfilePage>
            </ProtectedRouteElement>
          } />
          <Route path={ORDER_HISTORY_ID_ROUTE} element={
            <ProtectedRouteElement>
              <OrderInfoPage />
            </ProtectedRouteElement>
          } />
        </Route>
        <Route path={INGREDIENTS_ROUTE} element={<IngredientPage />} />
        <Route path={NON_FOUND_ROUTE} element={<NonFound404Page />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path={INGREDIENTS_ROUTE} element={
            <Modal 
              closeModal={() => { 
                dispatch(deleteIngredientDetails())
                navigate(-1)}} 
              title={'Детали ингредиента'}
            >
              <IngredientDetails />
            </Modal>
          } />
          <Route path={ORDER_FEED_ID_MODAL_ROUTE} element={
            <Modal 
              closeModal={() => {
                navigate(-1)
              } } 
              title={'id'}
            >
              <OrderInfo />
            </Modal>
          } />
          <Route path={ORDER_HISTORY_ID_MODAL_ROUTE} element={
            <ProtectedRouteElement>
              <Modal 
                closeModal={() => {
                  navigate(-1)
                }}
                title={'id'}
              >
                <OrderInfo />
              </Modal>
            </ProtectedRouteElement>
          } />
        </Routes>
      )}
    </div>
  );
}

export default App;