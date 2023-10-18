import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import AppHeader from '../components/app-header/app-header';
import Preloader from '../components/preLoader/preloader';

export default function TokenPage() {
  

  return (
    <>
      <AppHeader />
      <Preloader />
    </>
  )
}