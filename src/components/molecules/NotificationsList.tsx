import React from 'react';
import Notification from '../atoms/Notification/Notification';

interface Notifications {
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
  notifications: Notifications[];
}

const NotificationsList: React.FC<Props> = ({ notifications }) => {
  return (
    <>
      {notifications.map(({ content, id, userName, photoURL, type, createdAt }) => (
        <Notification
          content={content}
          id={id}
          userName={userName}
          type={type}
          photoURL={photoURL}
          createdAt={createdAt}
          key={id}
        />
      ))}
    </>
  );
};

export default NotificationsList;
