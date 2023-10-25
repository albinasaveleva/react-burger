import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import PageForm from '../components/page-form/page-form';
import Preloader from '../components/preLoader/preloader';

import { 
  Box,
  Button,
  Input,
  EmailInput,
  PasswordInput,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import { registerRequest } from '../services/auth/actions';
import { useForm } from '../hooks/useForm';

function RegistrationPage() {
  const {values, handleChange} = useForm({
    name: '',
    email: '',
    password: ''
  });

  const isRegistrRequest = useSelector(store => store.auth.isRegistrRequest);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerRequest(values));
  };

  const renderPage = () => {
    return (
      <PageForm handleSubmit={handleSubmit} className={'mt-45'}>
        <p className="mb-6 text text_type_main-medium">Регистрация</p>
        <Input
          name={'name'}
          value={values.name}
          type={'text'}
          placeholder={'Имя'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={handleChange}            
        />
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

export default React.memo(RegistrationPage);