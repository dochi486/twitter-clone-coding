import { dbService } from 'myBase';
import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const Home = ({ userObj }) => {
  const [dweet, setDweet] = useState('');
  const [dweets, setDweets] = useState([]);

  // const getDweets = async () => {
  //   const dbDweets = await dbService.collection('dweets').get();
  //   dbDweets.forEach((document) => {
  //     const dweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setDweets((prev) => [dweetObject, ...prev]);
  //   });
  // };

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

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('dweets').add({
      text: dweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setDweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={dweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type="submit" value="Dweet" />
      </form>
      <div>
        {dweets.map((dweet) => (
          <div key={dweet.id}>
            <h4>{dweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
