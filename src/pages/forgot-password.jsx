import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import PageForm from '../components/page-form/page-form';
import AppHeader from '../components/app-header/app-header';
import { 
  Box,
  Button,
  EmailInput,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import { forgotPasswordRequest } from '../services/auth/actions';

export default function ForgotPasswordPage() {
  const [ emailValue, setEmailValue ] = React.useState("");
  const isForgotPasswordSuccess = useSelector(store => store.auth.isForgotPasswordSuccess);

  React.useEffect(() => {
    if (isForgotPasswordSuccess) {
      navigate('/reset-password');
    }
  }, [isForgotPasswordSuccess])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPasswordRequest({email: emailValue}));
    resetForm();
  };

  const resetForm = () => {
    setEmailValue("");
  };

  return (
    <>
      <AppHeader />
      <PageForm handleSubmit={handleSubmit} className={'mt-45'}>
        <p className="mb-6 text text_type_main-medium">Восстановление пароля</p>
        <EmailInput
          value={emailValue}
          placeholder={'Укажите e-mail'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={e => setEmailValue(e.target.value)}
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
    </>
  )
}