import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from "react-router-dom";



export function ProtectedRouteElement({ onlyUnAuth = false, children }) {
  const location = useLocation();

  const isLoginSuccess = useSelector(store => store.auth.isLoginSuccess);

  if (onlyUnAuth && isLoginSuccess) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate replace to={from} />
  }

  if (!onlyUnAuth && !isLoginSuccess) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return children;
}