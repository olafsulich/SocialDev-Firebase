import React, { lazy, Suspense } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { auth } from '../firebase/firebase';
import PageTemplate from '../templates/PageTemplate';
import Loader from '../components/atoms/Loader/Loader';

const EditProfile = lazy(() => import('../components/molecules/EditProfile'));
const UserCard = lazy(() => import('../components/atoms/UserCard/UserCard'));
const Heading = lazy(() => import('../components/atoms/Heading/Heading'));

const StyledDiv = styled.div`
  width: 42rem;
  height: 85vh;
  max-height: 90vh;
`;

const StyledAccountWrapper = styled.div`
  width: 90%;
  height: 5%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border: 2px solid #e6ecf1;
  border-top: none;
  padding: 1rem 3rem;
  @media screen and (min-width: 400px) {
    width: 100%;
  }

  ${({ heading }) =>
    heading &&
    css`
      border: none;
      background-color: #f5f8fa;
      width: 90%;
      height: 10%;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 2rem 3rem;
    `}
`;

const StyledButtonWrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1.5rem;
  padding-right: 8rem;
  @media screen and (min-width: 340px) {
    padding-right: 1rem;
  }
  @media screen and (min-width: 400px) {
    width: 100%;
  }
`;

const StyledButtonLogout = styled.button`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.regular};
  color: #fff;
  background-color: hsla(203, 89%, 53%, 0.8);
  border-radius: 30px;
  padding: 0.4rem 3rem;
`;

const Account = ({ currentUser }) => {
  const { userName, email, photoURL, createdAt } = currentUser.authUser;

  return (
    <PageTemplate>
      <StyledDiv>
        <Suspense fallback={<Loader />}>
          <StyledAccountWrapper heading>
            <Heading>Account</Heading>
          </StyledAccountWrapper>
          <EditProfile photoURL={photoURL} nameOfUser={userName} />
          <UserCard name="Email" value={email} />
          <UserCard name="Created at" value={createdAt} createdAt />
          <StyledButtonWrapper>
            <StyledButtonLogout onClick={() => auth.signOut()}>Log out</StyledButtonLogout>
          </StyledButtonWrapper>
        </Suspense>
      </StyledDiv>
    </PageTemplate>
  );
};

Account.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Account;
