import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../firebase/firebase';

export const Context = createContext({
  email: '',
  password: '',
  displayName: '',
  newAccount: false,
  handleEmailChange: () => {},
  handlePasswordChange: () => {},
  handleDisplayNameChange: () => {},
  handleNewAccount: () => {},
  handleSignup: () => {},
  handleSignin: () => {},
  handleLogout: () => {},
});

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [newAccount, setNewAccount] = useState(false);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handleDisplayNameChange = e => {
    setDisplayName(e.target.value);
  };
  const handleNewAccount = e => {
    e.preventDefault();
    setNewAccount(prevNewAccount => !prevNewAccount);
  };

  const handleSignin = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      /* eslint-disable */
      .catch(error => alert(`Your email or password is incorrect, please check your data`));
  };

  const handleSignup = e => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(error => alert(`Email is already in use, sign in or use other email`));
  };

  const handleLogout = () => auth.signOut();
  return (
    <Context.Provider
      value={{
        email,
        password,
        displayName,
        handleEmailChange,
        handleDisplayNameChange,
        handlePasswordChange,
        handleSignin,
        handleSignup,
        handleNewAccount,
        newAccount,
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};
Provider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Provider;
