import { authService } from 'myBase';
import React from 'react';

const Profile = () => {
  const onClickLogOut = () => {
    authService.signOut();
  };
  return (
    <>
      <button onClick={onClickLogOut}>Log Out</button>
    </>
  );
};

export default Profile;
