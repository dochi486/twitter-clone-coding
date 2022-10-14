import { authService, dbService } from 'myBase';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, getDocs, query, where } from '@firebase/firestore';

const Profile = ({ userObj }) => {
  const history = useHistory();

  const onClickLogOut = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyDweet = async () => {
    const q = query(
      collection(dbService, 'dweets'),
      where('creatorId', '==', userObj.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });

    // const dweets = await dbService
    //   .collection('dweets')
    //   .where('creatorId', '==', userObj.uid)
    //   .orderBy('createdAt')
    //   .get();
    // console.log(dweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyDweet();
  }, []);

  return (
    <>
      <button onClick={onClickLogOut}>Log Out</button>
    </>
  );
};

export default Profile;
