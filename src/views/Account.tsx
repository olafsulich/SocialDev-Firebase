import React, { lazy, Suspense } from 'react';
import styled, { css } from 'styled-components';
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

const StyledAccountWrapper = styled.div<{ heading?: boolean }>`
  width: 90%;
  height: 5%;
  display: flex;
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
      width: 90%;
      height: 10%;
      align-items: center;
      justify-content: flex-start;
      padding: 2rem 3rem;

      background-color: hsla(203, 89%, 53%, 0.6);

      h1 {
        color: #fff;
      }
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

  :focus {
    color: hsla(203, 89%, 53%, 0.8);
    background: none;
    border: 2px solid hsla(203, 89%, 53%, 0.8);
  }
`;

interface Props {
  currentUser: {
    authUser?: {
      userName: string;
      email: string;
      photoURL: string;
      createdAt: {
        toDate: () => {};
      };
    };
  };
}

const Account: React.FC<Props> = ({ currentUser }) => {
  if (currentUser.authUser) {
    const { userName, email, photoURL, createdAt } = currentUser.authUser;
    return (
      <PageTemplate>
        <StyledDiv>
          <Suspense fallback={<Loader />}>
            <StyledAccountWrapper heading>
              <Heading as="h1">Account</Heading>
            </StyledAccountWrapper>
            <EditProfile photoURL={photoURL} nameOfUser={userName} />
            <UserCard textName="Email" email={email} />
            <UserCard textName="Created at" createdAt={createdAt} />
            <StyledButtonWrapper>
              <StyledButtonLogout onClick={() => auth.signOut()}>Log out</StyledButtonLogout>
            </StyledButtonWrapper>
          </Suspense>
        </StyledDiv>
      </PageTemplate>
    );
  }
  return <div>error</div>;
};

export default Account;
