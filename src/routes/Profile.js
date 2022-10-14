import { authService } from 'myBase';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onClickLogOut = () => {
    authService.signOut();
    history.push('/');
  };
  return (
    <>
      <button onClick={onClickLogOut}>Log Out</button>
    </>
  );
};

export default Profile;
