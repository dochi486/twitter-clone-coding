import { dbService } from 'myBase';
import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

const Dweet = ({ dweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDweet, setNewDweet] = useState(dweetObj.text);

  const NweetTextRef = doc(dbService, 'dweets', `${dweetObj.id}`);

  const onClickDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this dweet');
    if (ok) {
      //삭제
      await deleteDoc(NweetTextRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newDweet,
    });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your dweet"
              value={newDweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Dweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{dweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onClickDelete}>Delete Dweet</button>
              <button onClick={toggleEditing}>Edit Dweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dweet;
