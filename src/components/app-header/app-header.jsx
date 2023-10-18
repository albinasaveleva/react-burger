import React from "react";
import { Link } from "react-router-dom";

import headerStyle from './app-header.module.css';

import { 
  Box,
  BurgerIcon, 
  Logo,
  ListIcon, 
  ProfileIcon,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${headerStyle.header}`}>
      <nav className={headerStyle.navigation}>
        <ul>
          <li className={headerStyle.navigationItem}>
            <Link to={'/'} className={`ml-5 mr-5 mb-4 mt-4 ${headerStyle.link}`}  id="constructor">
              <div className={`mr-2 ${headerStyle.linkIcon}`}>
                <BurgerIcon type="primary" />
              </div>
              <div className={headerStyle.linkTitle}>
                <span className="text text_type_main-default">Конструктор</span>
              </div>
            </Link>
          </li>
          <li className={headerStyle.navigationItem}>
            <Link to={'/'} className={`ml-5 mr-5 mb-4 mt-4 ${headerStyle.link}`} id="orders">
              <div className={`mr-2 ${headerStyle.linkIcon}`}>
                <ListIcon type="secondary" />
              </div>
              <div className={headerStyle.linkTitle}>
                <span className="text text_type_main-default">Лента заказов</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={headerStyle.logo}>
        <Logo />
      </div>
      <div className={headerStyle.account}>
        <Link to={'/profile'} className={`ml-5 mr-5 mb-4 mt-4 ${headerStyle.link}`} id="profile">
          <div className={`mr-2 ${headerStyle.linkIcon}`}>
            <ProfileIcon type="secondary" />
          </div>
          <div className={headerStyle.linkTitle}>
            <span className="text text_type_main-default">Личный кабинет</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

// export default AppHeader;
export default React.memo(AppHeader);