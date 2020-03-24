import React from 'react';
import Notification from '../atoms/Notification/Notification';

interface Props {
  notifications: never[];
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
