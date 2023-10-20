import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import AppHeader from '../components/app-header/app-header';
import PageForm from '../components/page-form/page-form';

import { 
  Box,
  Button,
  Input,
  EmailInput,
  PasswordInput,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import profileStyle from './profile.module.css';
import { logoutRequest } from '../services/auth/actions';
import { getUser, updateUser } from '../services/auth/actions';

export default function ProfilePage() {
  const [currentLink, setCurrrentLink] = React.useState(null);
  const user = useSelector(store => store.auth.user);
  const [ state, setState ] = React.useState({
    name: user.name,
    email: user.email,
    password: user.password
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const checkLocation = () => {
    const location = window.location.pathname
      .split('/')
      .filter((item)=> item.length > 0)[1];
    setCurrrentLink(location ? location : 'profile');
  };

  React.useEffect(()=>{
    checkLocation()
  }, [currentLink])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(()=>{
    dispatch(getUser());
  }, [])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setIsEdit(true);
    setState({
      ...state,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser({
      name: state.name,
      email: state.email,
      password: state.password
    }));
    setIsEdit(false);
  };

  const handleClick = () => {
    setIsEdit(false);
    setState({
      name: user.name,
      email: user.email,
      password: user.password
    });
  };



  return (
    <>
      <AppHeader />
      <div className={`pt-30 ${profileStyle.container}`}>
            <div className={`mr-15 ml-5 ${profileStyle.sidebar}`}>
              <div className={`mb-20 ${profileStyle.navigation}`}>
                <ul>
                  <li>
                    <Link to={'/profile'}>
                      <span 
                        className={ currentLink === 'profile' 
                          ? 'text text_type_main-medium' 
                          : 'text text_type_main-medium text_color_inactive' }
                      >
                        Профиль
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/profile/orders'}>
                    <span 
                        className={ currentLink === 'orders' 
                          ? 'text text_type_main-medium' 
                          : 'text text_type_main-medium text_color_inactive' }
                      >
                        История заказов
                      </span>
                    </Link>
                  </li>
                  <li onClick={()=>{
                    dispatch(logoutRequest());
                    navigate('/login');
                  }}>
                    <span 
                      className="text text_type_main-medium text_color_inactive"
                    >
                      Выход
                    </span>
                  </li>
                </ul>
              </div>
              <div className={profileStyle.caption}>
                <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
              </div>
            </div>
            <div className={profileStyle.edit}>
              <PageForm handleSubmit={handleSubmit}>
              <Input
                name={'name'}
                value={state.name}
                type={'text'}
                placeholder={'Имя'}
                size={'default'}
                icon={'EditIcon'}
                extraClass='mb-6 input-field'
                onChange={handleChange}            
              />
              <EmailInput
                name={'email'}
                value={state.email}
                placeholder={'Логин'}
                size={'default'}
                icon={'EditIcon'}
                extraClass='mb-6 input-field'
                onChange={handleChange}
              />
              <PasswordInput
                name={'password'}
                value={state.password}
                placeholder={'Пароль'}
                size={'default'}
                icon={'EditIcon'}
                extraClass='mb-6 input-field'
                onChange={handleChange}
              />
              {
                isEdit && <div className='actions'>
                  <Button 
                    type="secondary" 
                    size="medium"
                    extraClass='mb-20 action' 
                    htmlType="button" 
                    onClick={handleClick}
                  >
                    Отмена
                  </Button>
                  <Button 
                    type="primary" 
                    size="medium"
                    extraClass='mb-20 action' 
                    htmlType="submit" 
                  >
                    Сохранить
                  </Button>
                </div>
              }
              </PageForm>
            </div>
      </div>
    </>
  )
}
