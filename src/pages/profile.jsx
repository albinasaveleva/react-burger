import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from "react-router-dom";

import { 
  Box,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import profileStyle from './profile.module.css';
import { logoutRequest } from '../services/auth/actions';
import { getUser } from '../services/auth/actions';
import Preloader from '../components/preLoader/preloader';

function ProfilePage() {
  const isGetUserRequest = useSelector(store => store.auth.isGetUserRequest);

  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(getUser());
  }, [])

  const renderPage = () => {
    return (
      <div className={`mt-30 ml-5 ${profileStyle.container}`}>
        <div className={`mr-15 ${profileStyle.sidebar}`}>
          <div className={`mb-20 ${profileStyle.navigation}`}>
            <ul>
              <li>
                <NavLink to={'/profile'} end>
                  {
                    ({ isActive }) => (
                      isActive
                      ? <span className='text text_type_main-medium'>
                        Профиль
                      </span>
                      : <span className='text text_type_main-medium text_color_inactive'>
                        Профиль
                      </span>
                    )
                  }
                </NavLink>
              </li>
              <li>
                <NavLink to={'/profile/orders'} >
                  {
                    ({ isActive }) => (
                      isActive
                      ? <span className='text text_type_main-medium'>
                        История заказов
                      </span>
                      : <span className='text text_type_main-medium text_color_inactive'>
                        История заказов
                      </span>
                    )
                  }
                </NavLink>
              </li>
              <li>
                <NavLink to={'/login'} onClick={()=> {dispatch(logoutRequest())}}>
                  {
                    ({ isActive }) => (
                      isActive
                      ? <span className='text text_type_main-medium'>
                        Выход
                      </span>
                      : <span className='text text_type_main-medium text_color_inactive'>
                        Выход
                      </span>
                    )
                  }
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    )
  }

  return (
    <>
      {
        isGetUserRequest
          ? <Preloader />
          : renderPage()
      }
    </>
  );
}

export default React.memo(ProfilePage);