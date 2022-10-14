import { dbService, storageService } from 'myBase';
import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from '@firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Dweet = ({ dweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDweet, setNewDweet] = useState(dweetObj.text);

  const NweetTextRef = doc(dbService, 'dweets', `${dweetObj.id}`);

  const onClickDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this dweet');
    if (ok) {
      //삭제
      await deleteDoc(NweetTextRef);
      const urlRef = ref(storageService, dweetObj.attachmentUrl);
      if (dweetObj.attachmentUrl !== '') {
        await deleteObject(urlRef);
      }
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
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="Edit your dweet"
                  value={newDweet}
                  required
                  onChange={onChange}
                  autoFocus
                  className="formInput"
                />
                <input type="submit" value="Update Dweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{dweetObj.text}</h4>
          {dweetObj.attachmentUrl && <img src={dweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onClickDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dweet;
