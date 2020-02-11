import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';
import Home from './Home';
import Login from './Login';
import Account from './Account';
import { auth } from '../firebase/firebase';
import AppProvider from '../context/context';
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      // const authUser = createUserDoc(user);
      console.log(user);
      setCurrentUser(user);
      console.log(currentUser);
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
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/account" component={Account} />
            </Switch>
          )}
        </BrowserRouter>
      </MainTemplate>
    </AppProvider>
  );
};

export default App;
