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

  const isLoginSuccess = useAppSelector((store) => store.auth.isLoginSuccess);

  if (onlyUnAuth && isLoginSuccess) {
    console.log(location.state || { from: { pathname: INDEX_ROUTE } })
    const { from } = location.state || { from: { pathname: INDEX_ROUTE } }
    return <Navigate replace={true} to={from} state={ from.state ? from.state : null } />
  }

  if (!onlyUnAuth && !isLoginSuccess) {
    return <Navigate to={LOGIN_ROUTE} state={{ from: location }} />
  }

  return children;
}
