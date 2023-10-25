import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import { 
  Box,
  Button,
  Input,
  PasswordInput,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPasswordRequest } from '../services/auth/actions';
import { useForm } from '../hooks/useForm';

import PageForm from '../components/page-form/page-form';
import Preloader from '../components/preLoader/preloader';

function ResetPasswordPage() {
  const {values, handleChange} = useForm({
    password: "",
    token: ""
  });

  const isForgotPasswordSuccess = useSelector(store => store.auth.isForgotPasswordSuccess);
  const isResetPasswordRequest = useSelector(store => store.auth.isResetPasswordRequest);
  const isResetPasswordSuccess = useSelector(store => store.auth.isResetPasswordSuccess);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(()=>{
    if (!isForgotPasswordSuccess) {
      navigate('/forgot-password')
    }

    if (isResetPasswordSuccess) {
      navigate('/login');
    }
  }, [isForgotPasswordSuccess, isResetPasswordSuccess])

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPasswordRequest(values));
  };

  const renderPage = () => {
    return (
      <PageForm handleSubmit={handleSubmit} className={'mt-45'}>
        <p className="mb-6 text text_type_main-medium">Восстановление пароля</p>
        <PasswordInput
          name='password'
          value={values.password}
          placeholder={'Введите новый пароль'}
          size={'default'}
          icon={'ShowIcon'}
          extraClass='mb-6 input-field'
          onChange={handleChange}
        />
        <Input
          name='token'
          value={values.token}
          type={'text'}
          placeholder={'Введите код из письма'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={handleChange}
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
  };

  return (
    <>
      {
        isResetPasswordRequest 
          ? <Preloader />
          : renderPage()
      }
    </>
  );
}

export default React.memo(ResetPasswordPage);