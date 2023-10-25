import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { loginRequest } from '../services/auth/actions';

import { 
  Box,
  Button,
  EmailInput,
  PasswordInput,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import Preloader from '../components/preLoader/preloader';
import PageForm from '../components/page-form/page-form';

function LoginPage() {
  const [ state, setState ] = React.useState({
    email: '',
    password: ''
  });
  const isLoginRequest = useSelector(store => store.auth.isLoginRequest);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginRequest({
      email: state.email,
      password: state.password
    }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState({
      ...state,
      [name]: value
    });
  }

  const renderPage = () => {
    return (
      <PageForm handleSubmit={handleSubmit} className={'mt-45'}>
        <p className="mb-6 text text_type_main-medium">Вход</p>
        <EmailInput
          name={'email'}
          value={state.email}
          placeholder={'E-mail'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={handleChange}
        />
        <PasswordInput
          name={'password'}
          value={state.password}
          placeholder={'Пароль'}
          size={'default'}
          icon={'ShowIcon'}
          extraClass='mb-6 input-field'
          onChange={handleChange}
        />
        <Button 
          type="primary" 
          size="medium"
          extraClass='mb-20 action' 
          htmlType="submit" 
        >
          Войти
        </Button>
        <p className='mb-4 text text_type_main-default additional-action'>Вы — новый пользователь? 
          <Link to={'/register'}> Зарегистрироваться</Link>
        </p>
        <p className='text text_type_main-default additional-action'>Забыли пароль? 
          <Link to={'/forgot-password'}> Восстановить пароль</Link>
        </p>
      </PageForm>
    )
  }

  return (
    <>
      {
        isLoginRequest
          ? <Preloader />
          : renderPage()
      }
    </>
  )
}

export default React.memo(LoginPage);