import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import PageForm from '../components/page-form/page-form';
import AppHeader from '../components/app-header/app-header';

import { 
  Box,
  Button,
  Input,
  EmailInput,
  PasswordInput,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import { registerRequest } from '../services/auth/actions';

export default function RegistrationPage() {
  const [ nameValue, setNameValue ] = React.useState("");
  const [ emailValue, setEmailValue ] = React.useState("");
  const [ passwordValue, setPasswordValue ] = React.useState("");

  const isRegistrSuccess = useSelector(store => store.auth.isLoginSuccess);

  React.useEffect(()=>{
    if (isRegistrSuccess) {
      navigate('/');
    }
  }, [isRegistrSuccess])

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerRequest({
      email: emailValue,
      password: passwordValue,
      name: nameValue
    }));
    resetForm();
  }

  const resetForm = () => {
    setEmailValue("");
    setPasswordValue("");
    setNameValue("");
  };

  return (
    <>
      <AppHeader />
      <PageForm handleSubmit={handleSubmit} className={'mt-45'}>
        <p className="mb-6 text text_type_main-medium">Регистрация</p>
        <Input
          value={nameValue}
          type={'text'}
          placeholder={'Имя'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={e => setNameValue(e.target.value)}            
        />
        <EmailInput
          value={emailValue}
          placeholder={'E-mail'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={e => setEmailValue(e.target.value)}
        />
        <PasswordInput
          value={passwordValue}
          placeholder={'Пароль'}
          size={'default'}
          icon={'ShowIcon'}
          extraClass='mb-6 input-field'
          onChange={e => setPasswordValue(e.target.value)}
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
    </>
  )
}
