import React, {FC} from 'react';
import { Link } from "react-router-dom";
import { loginRequest } from '../services/auth/actions';
import { useForm } from '../hooks/useForm';

import { 
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Preloader from '../components/preLoader/preloader';
import PageForm from '../components/page-form/page-form';

import { useAppDispatch, useAppSelector } from '../hooks/hook';

type TValues = {
  email: string, 
  password: string,
};

const LoginPage: FC = () => {
  const {values, handleChange} = useForm({
    email: '',
    password: ''
  });

  const isLoginRequest = useAppSelector((store) => store.auth.isLoginRequest);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(values as TValues));
  };

  const renderPage = () => {
    return (
      <PageForm handleSubmit={handleSubmit} classNameString='mt-45'>
        <p className="mb-6 text text_type_main-medium">Вход</p>
        <EmailInput
          name={'email'}
          value={(values as TValues).email}
          placeholder={'E-mail'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={handleChange}
        />
        <PasswordInput
          name={'password'}
          value={(values as TValues).password}
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

export default LoginPage;