import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';
import Home from './Home';
import Login from './Login';
import Account from './Account';

const App = () => (
  <MainTemplate>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/account" component={Account} />
      </Switch>
    </BrowserRouter>
  </MainTemplate>
);

export default App;
