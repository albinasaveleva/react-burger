import React, {FC} from 'react';
import { Link } from "react-router-dom";

import PageForm from '../components/page-form/page-form';
import Preloader from '../components/preLoader/preloader';

import { 
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { registerRequest } from '../services/auth/actions';
import { useForm } from '../hooks/useForm';

import { useAppDispatch, useAppSelector } from '../services/store/store';

type TValues = {
  email: string, 
  password: string, 
  name: string,
};

const RegistrationPage: FC = () => {
  const {values, handleChange} = useForm({
    name: '',
    email: '',
    password: ''
  });

  const isRegistrRequest = useAppSelector((store) => store.auth.isRegistrRequest);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerRequest(values as TValues));
  };

  const renderPage = () => {
    return (
      <PageForm handleSubmit={handleSubmit} classNameString='mt-45'>
        <p className="mb-6 text text_type_main-medium">Регистрация</p>
        <Input
          name={'name'}
          value={(values as TValues).name}
          type={'text'}
          placeholder={'Имя'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={handleChange}            
        />
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
          Зарегистрироваться
        </Button>
        <p className='mb-4 text text_type_main-default additional-action'>Уже зарегистрированы?
          <Link to={'/login'}> Войти</Link>
        </p>
      </PageForm>
    )
  }

  return (
    <>
      {
        isRegistrRequest
          ? <Preloader />
          : renderPage()
      }
    </>
  )
}

export default RegistrationPage;