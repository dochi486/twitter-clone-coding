import Navigation from 'components/Navigation';
import { dbService } from 'myBase';
import React, { useState } from 'react';

const Home = () => {
  const [dweet, setDweet] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.collection('dweets').add({
      dweet: dweet,
      createdAt: Date.now(),
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
    </div>
  );
};

export default Home;
