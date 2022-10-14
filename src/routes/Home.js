import { dbService } from 'myBase';
import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import Dweet from 'components/Dweet';
import DweetFactory from 'components/DweetFactory';

const Home = ({ userObj }) => {
  const [dweets, setDweets] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, 'dweets'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const dweetArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDweets(dweetArr);
    });
  }, []);

  return (
    <div className="container">
      <DweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {dweets.map((dweet) => (
          <Dweet
            key={dweet.id}
            dweetObj={dweet}
            isOwner={dweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
