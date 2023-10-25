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

function RegistrationPage() {
  const [ state, setState ] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const isRegistrSuccess = useSelector(store => store.auth.isRegistrSuccess);
  const isRegistrRequest = useSelector(store => store.auth.isRegistrRequest);


  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // React.useEffect(()=>{
  //   if (isRegistrSuccess) {
  //     navigate('/login');
  //   }
  // }, [isRegistrSuccess])

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerRequest({
      name: state.name,
      email: state.email,
      password: state.password,
    }));
    resetForm();
  }

  const resetForm = () => {
    setState({
      name: '',
      email: '',
      password: ''
    });
  }
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState({
      ...state,
      [name]: value
    });
  }

  const renderPage = () => {
    return (
      <PageForm handleSubmit={handleSubmit} className={'mt-45'}>
        <p className="mb-6 text text_type_main-medium">Регистрация</p>
        <Input
          name={'name'}
          value={state.name}
          type={'text'}
          placeholder={'Имя'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={handleChange}            
        />
        <EmailInput
          name={'email'}
          value={state.email}
          placeholder={'E-mail'}
          size={'default'}
          extraClass='mb-6 input-field'
          onChange={handleChange}
        />
        <PasswordInput
          name={'password'}
          value={state.password}
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