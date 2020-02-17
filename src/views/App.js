import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';
import Home from './Home';
import Login from './Login';
import Account from './Account';
import { auth, createUserDoc } from '../firebase/firebase';
import AppProvider, { Context } from '../context/context';
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      const authUser = await createUserDoc(user);
      console.log(authUser);
      setCurrentUser({ authUser });
    });
  }, []);
  return (
    <AppProvider>
      <MainTemplate>
        <BrowserRouter>
          {!currentUser ? (
            <Login />
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Home {...props} currentUser={currentUser} />}
              />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/account"
                render={props => <Account {...props} user={currentUser} />}
              />
            </Switch>
          )}
        </BrowserRouter>
      </MainTemplate>
    </AppProvider>
  );
};

export default App;
