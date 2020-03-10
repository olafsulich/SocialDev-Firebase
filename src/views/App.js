import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';
import Home from './Home';
import Login from './Login';
import Notifications from './Notifications';
import Messenger from './Messenger';
import Account from './Account';
import PostDetails from './PostDetails';
import RoomDetails from './RoomDetails';
import useUser from '../hooks/useUser';
import { routes } from '../routes/routes';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { home, account, notifications, messenger, post, room } = routes;
  useUser(setCurrentUser, currentUser);

  return (
    <MainTemplate>
      <BrowserRouter>
        {!currentUser ? (
          <Login />
        ) : (
          <Switch>
            <Route exact path={home} component={Home} />
            <Route exact path={notifications} component={Notifications} />
            <Route exact path={messenger} component={Messenger} />
            <Route
              exact
              path={account}
              render={props => <Account {...props} currentUser={currentUser} />}
            />
            <Route
              exact
              path={post}
              render={props => <PostDetails {...props} user={currentUser} />}
            />
            <Route
              exact
              path={room}
              render={props => <RoomDetails {...props} user={currentUser} />}
            />
          </Switch>
        )}
      </BrowserRouter>
    </MainTemplate>
  );
};

export default App;
