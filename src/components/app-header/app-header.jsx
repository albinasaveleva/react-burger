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
  const [currentLink, setCurrrentLink] = React.useState(null);

  const checkLocation = () => {
    const location = window.location.pathname
      .split('/')
      .filter((item)=> item.length > 0)[0];
    setCurrrentLink(location ? location : 'constructor');
  };

  React.useEffect(()=>{
    checkLocation()
  }, [currentLink])

  return (
    <header className={`pt-4 pb-4 ${headerStyle.header}`}>
      <nav className={headerStyle.navigation}>
        <ul>
          <li className={headerStyle.navigationItem}>
            <Link 
              to={'/'} 
              className={`ml-5 mr-5 mb-4 mt-4 ${headerStyle.link}`}
            >
              <div className={`mr-2 ${headerStyle.linkIcon}`}>
                <BurgerIcon 
                  type={ currentLink === 'constructor' 
                    ? 'primary' 
                    : 'secondary' 
                  }  
                />
              </div>
              <div className={headerStyle.linkTitle}>
                <span 
                  className={ currentLink === 'constructor' 
                    ? 'text text_type_main-default' 
                    : 'text text_type_main-default text_color_inactive' }
                >
                  Конструктор
                </span>
              </div>
            </Link>
          </li>
          <li className={headerStyle.navigationItem}>
            <Link 
              to={'/orders'} 
              className={`ml-5 mr-5 mb-4 mt-4 ${headerStyle.link}`}
            >
              <div className={`mr-2 ${headerStyle.linkIcon}`}>
                <ListIcon 
                  type={ currentLink === 'orders' 
                    ? 'primary' 
                    : 'secondary' 
                  } 
                />
              </div>
              <div className={headerStyle.linkTitle}>
                <span 
                  className={ currentLink === 'orders' 
                    ? 'text text_type_main-default' 
                    : 'text text_type_main-default text_color_inactive' }
                >
                  Лента заказов
                </span>
              </div>
            </Link>
          </li>
          <li className={headerStyle.navigationItem}>
            <Link 
              to={'/profile'} 
              className={`ml-5 mr-5 mb-4 mt-4 ${headerStyle.link}`}
            >
              <div className={`mr-2 ${headerStyle.linkIcon}`}>
                <ProfileIcon 
                  type={ currentLink === 'profile' 
                    ? 'primary' 
                    : 'secondary' 
                  } 
                />
              </div>
              <div className={headerStyle.linkTitle}>
                <span 
                  className={ currentLink === 'profile' 
                    ? 'text text_type_main-default' 
                    : 'text text_type_main-default text_color_inactive' }
                >
                  Личный кабинет
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={headerStyle.logo}>
        <Logo />
      </div>
    </header>
  );
};

// export default AppHeader;
export default React.memo(AppHeader);