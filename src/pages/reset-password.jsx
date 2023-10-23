import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import PageForm from '../components/page-form/page-form';

import { 
  Box,
  Button,
  Input,
  PasswordInput,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPasswordRequest } from '../services/auth/actions';

export default function ResetPasswordPage() {
  const [ passwordValue, setPasswordValue ] = React.useState("");
  const [ tokenValue, setTokenValue ] = React.useState("");

  const isForgotPasswordSuccess = useSelector(store => store.auth.isForgotPasswordSuccess);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(()=>{
    if (!isForgotPasswordSuccess) {
      navigate('/forgot-password')
    }
  }, [isForgotPasswordSuccess])

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPasswordRequest({
      password: passwordValue,
      token: tokenValue
    }));
    resetForm();
  };

  const resetForm = () => {
    setPasswordValue("");
    setTokenValue("");

    navigate('/login')
  };

  return (
    <PageForm handleSubmit={handleSubmit} className={'mt-45'}>
      <p className="mb-6 text text_type_main-medium">Восстановление пароля</p>
      <PasswordInput
        value={passwordValue}
        placeholder={'Введите новый пароль'}
        size={'default'}
        icon={'ShowIcon'}
        extraClass='mb-6 input-field'
        onChange={e => setPasswordValue(e.target.value)}
      />
      <Input
        value={tokenValue}
        type={'text'}
        placeholder={'Введите код из письма'}
        size={'default'}
        extraClass='mb-6 input-field'
        onChange={e => setTokenValue(e.target.value)}
      />
      <Button 
        type="primary" 
        size="medium"
        extraClass='mb-20 action' 
        htmlType="submit" 
      >
        Сохранить
      </Button>
      <p className='mb-4 text text_type_main-default additional-action'>Вспомнили пароль? 
        <Link to={'/login'}> Войти</Link>
      </p>
    </PageForm>
  )
}