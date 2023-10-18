import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import PageForm from '../components/page-form/page-form';
import AppHeader from '../components/app-header/app-header';
import { loginRequest } from '../services/auth/actions';

import { 
  Box,
  Button,
  EmailInput,
  PasswordInput,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function LoginPage() {
  const [ emailValue, setEmailValue ] = React.useState("");
  const [ passwordValue, setPasswordValue ] = React.useState("");
  const isLoginSuccess = useSelector(store => store.auth.isLoginSuccess);

  React.useEffect(()=>{
    if (isLoginSuccess) {
      navigate('/');
    }
  }, [isLoginSuccess]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginRequest({
      email: emailValue,
      password: passwordValue
    }));
    resetForm();
  };

  const resetForm = () => {
    setEmailValue("");
    setPasswordValue("");
  }

  return (
    <>
      <AppHeader />
      <PageForm handleSubmit={handleSubmit} className={'mt-45'}>
        <p className="mb-6 text text_type_main-medium">Вход</p>
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
          Войти
        </Button>
        <p className='mb-4 text text_type_main-default additional-action'>Вы — новый пользователь? 
          <Link to={'/register'}> Зарегистрироваться</Link>
        </p>
        <p className='text text_type_main-default additional-action'>Забыли пароль? 
          <Link to={'/forgot-password'}> Восстановить пароль</Link>
        </p>
      </PageForm>
    </>
  )
}
