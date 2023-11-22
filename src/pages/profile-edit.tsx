import React, {FC} from 'react';
import { updateUser } from '../services/auth/actions';
import { useForm } from '../hooks/useForm';

import { 
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import profileStyle from './profile.module.css';

import PageForm from '../components/page-form/page-form';
import Preloader from '../components/preLoader/preloader';

import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { TStore, TUser } from "../utils/types";

const ProfileEditPage: FC = () => {
  const isUpdateUserRequest = useAppSelector((store: TStore) => store.auth.isUpdateUserRequest);
  const user = useAppSelector((store: TStore) => store.auth.user);
  const {values, handleChange, setValues} = useForm({
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: user ? user.password || '' : ''
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(updateUser(values));
    setIsEdit(false);
  };

  const handleClick = () => {
    setIsEdit(false);
    setValues({
      name: (user as TUser).name,
      email: (user as TUser).email,
      password: (user as TUser).password || ''
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
            isIcon={true}
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