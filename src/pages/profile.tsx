import React, {FC} from 'react';

import { getUser } from '../services/auth/actions';
import Preloader from '../components/preLoader/preloader';
import Profile from '../components/profile/profile';

import { useAppDispatch, useAppSelector } from '../hooks/hook';

const ProfilePage: FC = () => {
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
          : <Profile />
      }
    </>
  );
}

export default ProfilePage;