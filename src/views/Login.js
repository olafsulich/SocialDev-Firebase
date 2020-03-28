import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from '../components/atoms/Heading/Heading';
import Input from '../components/atoms/Input/Input';
import Text from '../components/atoms/Text/Text';
import { auth, createUserDoc } from '../firebase/firebase';
import PreLoader from '../components/molecules/PreLoader';
import { Formik } from 'formik';

const StyledWrapper = styled.section`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.secondaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledForm = styled.form`
  width: 28rem;
  height: 36rem;
  padding: 4.5rem 0 1rem 0;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const StyledInputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 2rem;
  font-size: 3.7rem;
  text-transform: uppercase;
`;

const StyledInputLabelWrapper = styled.div`
  display: flex;
  flex-flow: column-reverse;
  position: relative;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  :first-of-type {
    margin-top: 0;
  }
  input + label {
    line-height: 1;
    height: 4rem;
    transition: transform 0.25s, opacity 0.25s ease-in-out;
    transform-origin: 0 0;
    transform: translate(20px, 50%);
    position: absolute;
    @media (min-width: 1000px) {
      transform: translate(20px, 55%);
    }
  }
`;

const StyledLabel = styled.label`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.fontColorText};
  font-size: 0.9rem;
  position: absolute;
  user-select: none;
`;

const StyledInput = styled(Input)`
  padding: 0.8rem 2.6rem;
  ::placeholder {
    color: transparent;
  }
  :not(:placeholder-shown) + label,
  :focus + label {
    transform: translate(10px, -15%);
    cursor: pointer;
  }
  @media (min-width: 1000px) {
    :not(:placeholder-shown) + label,
    :focus + label {
      transform: translate(10px, -10%);
      cursor: pointer;
    }
  }
  :focus + ::placeholder {
    color: inherit;
  }
  :focus {
    outline: 0;
  }
`;
const StyledButton = styled.button`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.fontColorText};
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 30px;
  padding: 0.7rem 4rem;
`;
const StyledText = styled(Text)`
  margin-top: 4rem;
  text-align: center;
`;

const StyledButtonSecondary = styled.button`
  position: relative;
  margin-left: 0.4rem;
  text-decoration: none;
  z-index: 2;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.bold};
  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 40%;
    background-color: ${({ theme }) => theme.primaryColor};
    z-index: 1;
    top: 55%;
    left: 10%;
  }
`;

const Login = () => {
  const [newAccount, setNewAccount] = useState(false);
  const [isLoaderVisible, setLoaderVisibility] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderVisibility(false);
    }, 1200);
    return () => clearTimeout(timer);
  });

  const handleNewAccount = e => {
    e.preventDefault();
    setNewAccount(prevState => !prevState);
  };

  const handleSignIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      /* eslint-disable */
      .catch(() => alert(`Your email or password is incorrect, please check your data`));
  };

  const handleSignUp = async (email, password, displayName) => {
    const { user } = await auth
      .createUserWithEmailAndPassword(email, password)
      .catch(() => alert(`Email is already in use, sign in or use other email`));
    createUserDoc(user, displayName);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', displayName: '' }}
      validate={({ email, password, displayName }) => {
        const errors = {};
        if (!email) {
          errors.email = 'Email is required';
        } else if (!password) {
          errors.password = 'Password is required';
        } else if (!displayName) {
          errors.password = 'Name is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
          errors.email = 'Invalid email address';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i.test(password)) {
          errors.password = 'Password should contain min. 6 characters and one number';
        }
        return errors;
      }}
      onSubmit={({ email, password, displayName }) =>
        newAccount ? handleSignUp(email, password, displayName) : handleSignIn(email, password)
      }
    >
      {({
        values: { email, password, displayName },
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <>
          {isLoaderVisible ? (
            <PreLoader />
          ) : (
            <StyledWrapper>
              <StyledHeading>Social Dev</StyledHeading>
              <StyledForm onSubmit={handleSubmit}>
                <StyledInputsWrapper>
                  <StyledInputLabelWrapper>
                    <StyledInput
                      id="displayName"
                      placeholder="name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="displayName"
                      value={displayName}
                      aria-label="displayName"
                      aria-required="true"
                      autoComplete="new-password"
                    />
                    <StyledLabel htmlFor="displayName">Name</StyledLabel>
                  </StyledInputLabelWrapper>
                  {errors.displayName && <Text errorMessage>{errors.displayName}</Text>}

                  <StyledInputLabelWrapper>
                    <StyledInput
                      id="email"
                      placeholder="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                      value={email}
                      aria-label="email"
                      aria-required="true"
                      autoComplete="new-password"
                    />
                    <StyledLabel>Email</StyledLabel>
                  </StyledInputLabelWrapper>
                  {errors.email && <Text errorMessage>{errors.email}</Text>}

                  <StyledInputLabelWrapper>
                    <StyledInput
                      id="password"
                      placeholder="password"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      value={password}
                      aria-label="password"
                      aria-required="true"
                      autoComplete="new-password"
                    />
                    <StyledLabel>Password</StyledLabel>
                  </StyledInputLabelWrapper>
                  {errors.password && <Text errorMessage>{errors.password}</Text>}

                  <StyledButton type="submit">{newAccount ? 'Sign up' : 'Sign in'}</StyledButton>
                </StyledInputsWrapper>
                <StyledText>
                  {newAccount ? 'Have account?' : "Haven't got account?"}
                  <StyledButtonSecondary aria-label="sign in/sign up" onClick={handleNewAccount}>
                    {newAccount ? 'Sign in' : 'Sign up'}
                  </StyledButtonSecondary>
                </StyledText>
              </StyledForm>
            </StyledWrapper>
          )}
        </>
      )}
    </Formik>
  );
};

export default Login;
