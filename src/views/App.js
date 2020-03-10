import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';
import { routes } from '../routes/routes';
import useUser from '../hooks/useUser';
import Loader from '../components/atoms/Loader/Loader';

const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Notifications = lazy(() => import('./Notifications'));
const Messenger = lazy(() => import('./Messenger'));
const Account = lazy(() => import('./Account'));
const PostDetails = lazy(() => import('./PostDetails'));
const RoomDetails = lazy(() => import('./RoomDetails'));

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { home, account, notifications, messenger, post, room } = routes;
  useUser(setCurrentUser, currentUser);

  return (
    <MainTemplate>
      <BrowserRouter>
        {!currentUser ? (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ) : (
          <Switch>
            <Suspense fallback={<Loader />}>
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
            </Suspense>
          </Switch>
        )}
      </BrowserRouter>
    </MainTemplate>
  );
};

export default App;
