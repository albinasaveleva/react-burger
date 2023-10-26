import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { loginRequest } from '../services/auth/actions';
import { useForm } from '../hooks/useForm';

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
  const {values, handleChange} = useForm({
    email: '',
    password: ''
  });

  const isLoginRequest = useSelector(store => store.auth.isLoginRequest);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginRequest(values));
  };

  const renderPage = () => {
    return (
      <PageForm handleSubmit={handleSubmit} className={'mt-45'}>
        <p className="mb-6 text text_type_main-medium">Вход</p>
        <EmailInput
          name={'email'}
          value={values.email}
          placeholder={'E-mail'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={handleChange}
        />
        <PasswordInput
          name={'password'}
          value={values.password}
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