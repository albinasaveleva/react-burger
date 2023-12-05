import React, {FC, ReactNode} from 'react';

import { getUser } from '../services/auth/actions';
import Preloader from '../components/preLoader/preloader';
import Profile from '../components/profile/profile';

import { useAppDispatch, useAppSelector } from '../services/store/store';

type TComponentProps = {
  children: ReactNode,
};

const ProfilePage: FC<TComponentProps> = ({ children }) => {
  const isGetUserRequest = useAppSelector((store) => store.auth.isGetUserRequest);

  const dispatch = useAppDispatch();

  React.useEffect(()=>{
    dispatch(getUser());
  }, [])

  return (
    <>
      {
        isGetUserRequest
          ? <Preloader />
          : <Profile>{children}</Profile>
      }
    </>
  );
}

export default ProfilePage;