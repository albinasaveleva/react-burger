import React, {FC} from "react";
import { NavLink } from "react-router-dom";

import headerStyle from './app-header.module.css';

import { 
  BurgerIcon, 
  Logo,
  ListIcon, 
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from "../../services/store/store";

const AppHeader: FC = () => {
  const user = useAppSelector(store => store.auth.user);

  return (
    <header className={`pt-4 pb-4 ${headerStyle.header}`}>
      <nav className={headerStyle.navigation}>
        <ul>
          <li className={headerStyle.navigationItem}>
            <NavLink 
              to={'/'} 
              className={`ml-5 mr-5 mb-4 mt-4 ${headerStyle.link}`}
            >
              {
                ({ isActive }) => (
                  isActive
                  ? <>
                    <div className={`mr-2 ${headerStyle.linkIcon}`}>
                      <BurgerIcon type='primary' />
                    </div>
                    <div className={headerStyle.linkTitle}>
                      <span className='text text_type_main-default'>
                        Конструктор
                      </span>
                    </div>
                  </>
                  : <>
                    <div className={`mr-2 ${headerStyle.linkIcon}`}>
                      <BurgerIcon type='secondary' />
                    </div>
                    <div className={headerStyle.linkTitle}>
                      <span className='text text_type_main-default text_color_inactive'>
                        Конструктор
                      </span>
                    </div>
                  </>
                )
              }
            </NavLink>
          </li>
          <li className={headerStyle.navigationItem}>
            <NavLink 
              to={'/feed'} 
              className={`ml-5 mr-5 mb-4 mt-4 ${headerStyle.link}` }
            >
              {
                ({ isActive }) => (
                  isActive
                  ? <>
                    <div className={`mr-2 ${headerStyle.linkIcon}`}>
                      <ListIcon type='primary' />
                    </div>
                    <div className={headerStyle.linkTitle}>
                      <span className='text text_type_main-default'>
                        Лента заказов
                      </span>
                    </div>
                  </>
                  : <>
                    <div className={`mr-2 ${headerStyle.linkIcon}`}>
                      <ListIcon type='secondary' />
                    </div>
                    <div className={headerStyle.linkTitle}>
                      <span className='text text_type_main-default text_color_inactive'>
                        Лента заказов
                      </span>
                    </div>
                  </>
                )
              }
            </NavLink>
          </li>
          <li className={headerStyle.navigationItem}>
            <NavLink 
              to={'/profile'} 
              className={`ml-5 mr-5 mb-4 mt-4 ${headerStyle.link}` }
            >
              {
                ({ isActive }) => (
                  isActive
                  ? <>
                    <div className={`mr-2 ${headerStyle.linkIcon}`}>
                      <ProfileIcon type='primary' />
                    </div>
                    <div className={headerStyle.linkTitle}>
                      <span className='text text_type_main-default'>
                        { user ? user.name : 'Личный кабинет' }
                      </span>
                    </div>
                  </>
                  : <>
                    <div className={`mr-2 ${headerStyle.linkIcon}`}>
                      <ProfileIcon type='secondary' />
                    </div>
                    <div className={headerStyle.linkTitle}>
                      <span className='text text_type_main-default text_color_inactive'>
                      { user ? user.name : 'Личный кабинет' }
                      </span>
                    </div>
                  </>
                )
              }
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={headerStyle.logo}>
        <NavLink to={'/'}>
          <Logo />
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;