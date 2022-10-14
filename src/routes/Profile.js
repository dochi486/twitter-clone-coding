import { authService } from 'myBase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, updateProfile } from '@firebase/auth';

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onClickLogOut = () => {
    authService.signOut();
    history.push('/');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    const auth = getAuth();
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
    }
    refreshUser();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onClickLogOut}>Log Out</button>
    </>
  );
};

export default Profile;
