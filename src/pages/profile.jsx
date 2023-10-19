import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

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
  const user = useSelector(store => store.auth.user);
  const [ state, setState ] = React.useState({
    name: user.name,
    email: user.email,
    password: user.password
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const dispatch = useDispatch();

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
                      <p className="text text_type_main-medium">Профиль</p>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/profile/orders'}>
                      <p className="text text_type_main-medium">История заказов</p>
                    </Link>
                  </li>
                  <li onClick={()=>{dispatch(logoutRequest())}}>
                    <p className="text text_type_main-medium">Выход</p>
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
