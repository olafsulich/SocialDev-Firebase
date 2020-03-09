import React from 'react';
import PropTypes from 'prop-types';
import Notification from '../atoms/Notification/Notification';

const NotificationsList = ({ notifications }) => {
  return (
    <>
      {notifications.map(props => {
        return <Notification {...props} key={props.id} />;
      })}
    </>
  );
};

NotificationsList.propTypes = {
  notifications: PropTypes.array,
  id: PropTypes.string,
};

NotificationsList.defaultProps = {
  notifications: {},
  id: null,
};

export default NotificationsList;
