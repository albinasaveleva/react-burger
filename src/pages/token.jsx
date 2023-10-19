import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { token } from '../services/auth/actions';


import AppHeader from '../components/app-header/app-header';
import Preloader from '../components/preLoader/preloader';

export default function TokenPage() {
  const isTokenSuccess = useSelector(store => store.auth.isTokenSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(()=>{
    dispatch(token());
  }, [])
  
  isTokenSuccess && navigate('/profile');

  return (
    <>
      <AppHeader />
      <Preloader />
    </>
  )
}