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

const Home = ({ userObj }) => {
  const [dweet, setDweet] = useState('');
  const [dweets, setDweets] = useState([]);
  const [attachment, setAttachment] = useState();

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
    // await dbService.collection('dweets').add({
    //   text: dweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setDweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0]; //오직 하나의 파일만 받기 때문에 0번째 인덱스에 접근
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClickClear = () => {
    setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Dweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClickClear}>Clear</button>
          </div>
        )}
      </form>
      <div>
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
