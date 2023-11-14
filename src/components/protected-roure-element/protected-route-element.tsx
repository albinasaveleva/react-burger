import React, {FC, ReactElement} from 'react';
import { useAppSelector } from '../../hooks/hook';
import { useLocation, Navigate } from "react-router-dom";

import { TStore } from "../../utils/types";

type TComponentProps = {
  onlyUnAuth?: boolean,
  children: ReactElement,
};

export const ProtectedRouteElement: FC<TComponentProps> = ({ onlyUnAuth = false, children }): ReactElement => {
  const location = useLocation();

  const isLoginSuccess = useAppSelector((store: TStore) => store.auth.isLoginSuccess);

  if (onlyUnAuth && isLoginSuccess) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate replace to={from} />
  }

  if (!onlyUnAuth && !isLoginSuccess) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return children;
}
