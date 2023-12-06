import React, {FC, ReactElement} from 'react';
import { useAppSelector } from '../../services/store/store';
import { useLocation, Navigate } from "react-router-dom";
import { INDEX_ROUTE, LOGIN_ROUTE } from '../../utils/burger-api';

type TComponentProps = {
  onlyUnAuth?: boolean,
  children: ReactElement,
};

export const ProtectedRouteElement: FC<TComponentProps> = ({ onlyUnAuth = false, children }): ReactElement => {
  const location = useLocation();
  // console.log(location)

  const isLoginSuccess = useAppSelector((store) => store.auth.isLoginSuccess);

  if (onlyUnAuth && isLoginSuccess) {
    const { from } = location.state || { from: { pathname: INDEX_ROUTE } }
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && !isLoginSuccess) {
    return <Navigate to={LOGIN_ROUTE} state={
      location.state?.backgroundLocation 
        // ? { from: location, backgroundLocation: location }
        ? { from: location }
        : { from: location }
    } />
  }

  return children;
}
