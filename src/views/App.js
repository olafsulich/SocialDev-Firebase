import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';
import Home from './Home';
import Login from './Login';
import Account from './Account';
import PostDetails from './PostDetails';
import useUser from '../hooks/useUser';
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useUser(setCurrentUser);
  return (
    <MainTemplate>
      <BrowserRouter>
        {!currentUser ? (
          <Login />
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/account"
              render={props => <Account {...props} currentUser={currentUser} />}
            />
            <Route
              exact
              path="/posts/:id"
              render={props => <PostDetails {...props} user={currentUser} />}
            />
          </Switch>
        )}
      </BrowserRouter>
    </MainTemplate>
  );
};

export default App;
