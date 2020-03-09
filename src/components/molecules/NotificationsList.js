import React from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';

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
  notifications: PropTypes.object,
  id: PropTypes.string,
};

NotificationsList.defaultProps = {
  notifications: {},
  id: null,
};

export default NotificationsList;
