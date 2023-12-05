import React, {FC, ReactNode} from "react";
import { NavLink, useLocation } from "react-router-dom";

import profileStyle from './profile.module.css';
import { logoutRequest } from '../../services/auth/actions';

import { useAppDispatch } from '../../services/store/store';

type TComponentProps = {
  children: ReactNode,
};

const Profile: FC<TComponentProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const renderCaption = () => {
    if (location.pathname === '/profile') {
      return (<span className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </span>)
    } else if ( location.pathname === '/profile/orders') {
      return (<span className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете просмотреть свою историю заказов
      </span>)
    }
  }

  return (
    <div className={`mt-30 ml-5 ${profileStyle.container}`}>
      <div className={profileStyle.sidebar}>
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
        <div className={profileStyle.caption}>
        { renderCaption() }
      </div>
      </div>
      { children }
    </div>
  )
}

export default Profile;