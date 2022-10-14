import { dbService } from 'myBase';
import React, { useState } from 'react';

const Dweet = ({ dweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDweet, setNewDweet] = useState(dweetObj.text);

  const onClickDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this dweet');
    if (ok) {
      //삭제
      await dbService.doc(`dweets/${dweetObj.id}`).delete();
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
    await dbService.doc(`dweets/${dweetObj.id}`).update({
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
              onChange={onChange}
              type="text"
              placeholder="edit your dweet"
              value={newDweet}
              required
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
              <button onCanPlay={toggleEditing}>Edit Dweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dweet;
