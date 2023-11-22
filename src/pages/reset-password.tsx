import React, {FC} from 'react';
import { Link, useNavigate } from "react-router-dom";

import { 
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPasswordRequest } from '../services/auth/actions';
import { useForm } from '../hooks/useForm';

import PageForm from '../components/page-form/page-form';
import Preloader from '../components/preLoader/preloader';

import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { TStore } from "../utils/types";

const ResetPasswordPage: FC = () => {
  const {values, handleChange} = useForm({
    password: "",
    token: ""
  });

  const isForgotPasswordSuccess = useAppSelector((store: TStore) => store.auth.isForgotPasswordSuccess);
  const isResetPasswordRequest = useAppSelector((store: TStore) => store.auth.isResetPasswordRequest);
  const isResetPasswordSuccess = useAppSelector((store: TStore) => store.auth.isResetPasswordSuccess);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(()=>{
    if (!isForgotPasswordSuccess) {
      navigate('/forgot-password')
    }

    if (isResetPasswordSuccess) {
      navigate('/login');
    }
  }, [isForgotPasswordSuccess, isResetPasswordSuccess])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(resetPasswordRequest(values));
  };

  const renderPage = () => {
    return (
      <PageForm handleSubmit={handleSubmit} classNameString='mt-45'>
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

export default ResetPasswordPage;