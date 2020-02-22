import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { auth, createUserDoc } from '../firebase/firebase';

export const Context = createContext({
  email: '',
  password: '',
  displayName: '',
  newAccount: false,
  currentUser: {},
  handleEmailChange: () => {},
  handlePasswordChange: () => {},
  handleDisplayNameChange: () => {},
  handleNewAccount: () => {},
  handleSignup: () => {},
  handleSignin: () => {},
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

  const handleSignup = async e => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      createUserDoc(user, displayName);
    } catch (error) {
      alert('error!!!!');
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

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
        // currentUser,
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
