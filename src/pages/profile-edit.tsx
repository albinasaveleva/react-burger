import React, {FC} from 'react';

import ProfileEdit from '../components/profile-edit/profile-edit';
import Preloader from '../components/preLoader/preloader';

import { useAppSelector } from '../services/store/store';

const ProfileEditPage: FC = () => {
  const isUpdateUserRequest = useAppSelector((store) => store.auth.isUpdateUserRequest);

  return (
    <>
      {
        isUpdateUserRequest
          ? <Preloader />
          : <ProfileEdit />
      }
    </>
  )
}

export default ProfileEditPage;