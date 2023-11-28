import React, {FC} from 'react';
import { NavLink, Outlet } from "react-router-dom";

import profileStyle from './profile.module.css';
import { logoutRequest } from '../../services/auth/actions';

import { useAppDispatch } from '../../hooks/hook';

const Profile: FC = () => {
  const dispatch = useAppDispatch();

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

export default Profile;