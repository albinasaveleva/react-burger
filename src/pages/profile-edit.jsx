import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../services/auth/actions';
import { useForm } from '../hooks/useForm';

import { 
  Box,
  Button,
  Input,
  EmailInput,
  PasswordInput,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';

import profileStyle from './profile.module.css';

import PageForm from '../components/page-form/page-form';
import Preloader from '../components/preLoader/preloader';

function ProfileEditPage() {
  const isUpdateUserRequest = useSelector(store => store.auth.isUpdateUserRequest);
  const user = useSelector(store => store.auth.user);
  const {values, handleChange, setValues} = useForm({
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: user ? user.password || '' : ''
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(values));
    setIsEdit(false);
  };

  const handleClick = () => {
    setIsEdit(false);
    setValues({
      name: user.name,
      email: user.email,
      password: user.password || ''
    });
  };

  const renderPage = () => {
    return (
      <>
        <div className={profileStyle.edit}>
          <PageForm handleSubmit={handleSubmit}>
          <Input
            name={'name'}
            value={values.name}
            type={'text'}
            placeholder={'Имя'}
            size={'default'}
            icon={'EditIcon'}
            extraClass='mb-6 input-field'
            onChange={(e)=>{
              handleChange(e);
              setIsEdit(true);
            }}            
          />
          <EmailInput
            name={'email'}
            value={values.email}
            placeholder={'Логин'}
            size={'default'}
            icon={'EditIcon'}
            extraClass='mb-6 input-field'
            onChange={(e)=>{
              handleChange(e);
              setIsEdit(true);
            }} 
          />
          <PasswordInput
            name={'password'}
            value={values.password}
            placeholder={'Пароль'}
            size={'default'}
            icon={'EditIcon'}
            extraClass='mb-6 input-field'
            onChange={(e)=>{
              handleChange(e);
              setIsEdit(true);
            }} 
          />
          {
            isEdit && <div className='actions'>
              <Button 
                type="secondary" 
                size="medium"
                extraClass='action' 
                htmlType="button" 
                onClick={handleClick}
              >
                Отмена
              </Button>
              <Button 
                type="primary" 
                size="medium"
                extraClass='action' 
                htmlType="submit" 
              >
                Сохранить
              </Button>
            </div>
          }
          </PageForm>
        </div>
        <div className={profileStyle.caption}>
          <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
        </div>
      </>
    )
  }

  return (
    <>
      {
        isUpdateUserRequest
          ? <Preloader />
          : renderPage()
      }
    </>
  )
}

export default React.memo(ProfileEditPage);