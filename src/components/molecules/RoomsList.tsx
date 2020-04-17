import React from 'react';
import Room from '../atoms/Room/Room';
import { roomsRef } from '../../firebase/firestoreRefs';

interface Rooms {
  title: string;
  id: string | undefined;
  user: object;
}

interface Props {
  rooms: Rooms[];
}

const RoomsList: React.FC<Props> = ({ rooms }) => {
  const handleRemove = (id: string) => {
    roomsRef.doc(id).delete();
  };

  return (
    <>
      {rooms.map(({ title, id, user }) => {
        return <Room title={title} id={id} key={id} user={user} handleRemove={handleRemove} />;
      })}
    </>
  );
};

export default RoomsList;
