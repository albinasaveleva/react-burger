import React, {FC} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { forgotPasswordRequest } from '../services/auth/actions';
import { useForm } from '../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../hooks/hook';

import PageForm from '../components/page-form/page-form';
import Preloader from '../components/preLoader/preloader';

import { TStore } from "../utils/types";


const ForgotPasswordPage: FC = () => {
  const {values, handleChange} = useForm({
    email: "",
  });

  const isForgotPasswordSuccess = useAppSelector((store: TStore) => store.auth.isForgotPasswordSuccess);
  const isForgotPasswordRequest = useAppSelector((store: TStore) => store.auth.isForgotPasswordRequest);

  React.useEffect(() => {
    if (isForgotPasswordSuccess) {
      navigate('/reset-password');
    }
  }, [isForgotPasswordSuccess])

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(forgotPasswordRequest(values));
  };

  const renderPage = () => {
    return (
      <PageForm handleSubmit={handleSubmit} classNameString='mt-45'>
        <p className="mb-6 text text_type_main-medium">Восстановление пароля</p>
        <EmailInput
          name='email'
          value={values.email}
          placeholder={'Укажите e-mail'}
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
          Восстановить
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
        isForgotPasswordRequest
          ? <Preloader />
          : renderPage()
      }
    </>
  )
  
}

export default ForgotPasswordPage;