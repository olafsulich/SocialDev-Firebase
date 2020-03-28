import React from 'react';
import Notification from '../atoms/Notification/Notification';

interface Notifi {
  content: string;
  id: number;
  userName: string;
  photoURL: string;
  type: string;
  createdAt: {
    toDate: () => {};
  };
}

interface Props {
  notifications: Notifi[];
}

const NotificationsList: React.FC<Props> = ({ notifications }) => {
  return (
    <>
      {notifications.map(({ content, id, userName, photoURL, type, createdAt }) => {
        return (
          <Notification
            content={content}
            id={id}
            userName={userName}
            type={type}
            photoURL={photoURL}
            createdAt={createdAt}
            key={id}
          />
        );
      })}
    </>
  );
};

export default NotificationsList;
