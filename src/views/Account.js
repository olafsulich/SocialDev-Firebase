import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Navigation from '../components/organisms/Navigation';
import Button from '../components/atoms/Button/Button';
import GridTemplate from '../templates/GridTemplate';
import PensilIcon from '../assets/pensil.svg';
import Heading from '../components/atoms/Heading/Heading';
import Text from '../components/atoms/Text/Text';
import UserProfileIcon from '../assets/userProfile.svg';
import EmailIcon from '../assets/email.svg';
import JoinedAtIcon from '../assets/joined.svg';
import { auth } from '../firebase/firebase';
import EditProfile from '../components/molecules/EditProfile';
const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  @media (min-width: 650px) {
    display: grid;
    grid-template-columns: 0.5fr 3fr;
    grid-column-gap: 3rem;
  }
`;

const StyledAccountWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const StyledImageWrapper = styled.figure`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
`;

const StyledInfoWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 2rem;
`;

const StyledButton = styled(Button)`
  background-size: 35% 35%;
`;

const StyledHeading = styled(Heading)`
  margin: 2rem 0;
  position: relative;

  ::before {
    width: 2rem;
    height: 2rem;
    position: absolute;
    content: '';
    background-image: url(${UserProfileIcon});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 90% 90%;
    left: -3rem;
    top: 0.4rem;
  }
`;
const StyledText = styled(Text)`
  margin: 2rem 0;
  position: relative;
  ::before {
    width: 2rem;
    height: 2rem;
    position: absolute;
    content: '';
    background-image: url(${({ icon }) => icon});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 90% 90%;
    left: -3rem;
    top: -0.4rem;
  }
`;
const StyledButtonLogut = styled.button`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.fontColorText};
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 30px;
  padding: 0.7rem 4rem;
  margin: 2rem 0 0 2rem;
`;
const Account = ({ user }) => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const { userName, email, photoURL } = user.authUser;
  const handleSidebarOpen = () => setSidebarOpen(prevState => !prevState);

  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        <StyledAccountWrapper>
          <StyledImageWrapper>
            <img
              src={
                photoURL ||
                'https://d2eip9sf3oo6c2.cloudfront.net/instructors/avatars/000/000/032/square_480/oapgW_Fp_400x400.jpg'
              }
              alt={userName}
            />
          </StyledImageWrapper>
          <StyledInfoWrapper>
            <StyledHeading>{userName}</StyledHeading>
            <StyledText icon={EmailIcon}>{email}</StyledText>
            <StyledText icon={JoinedAtIcon}>Joined at 19.02.2020</StyledText>
          </StyledInfoWrapper>
          <StyledButtonLogut onClick={() => auth.signOut()}>Log out</StyledButtonLogut>
        </StyledAccountWrapper>
        <StyledButton icon={PensilIcon} add onClick={handleSidebarOpen} />
      </GridTemplate>
      <EditProfile isVisible={SidebarOpen} handleAddPost={handleSidebarOpen} user={user} />
    </StyledWrapper>
  );
};
// class Account extends React.Component {
//   state = {
//     SidebarOpen: false,
//   };

//   imageInput = null;

//   get uid() {
//     return auth.currentUser.uid;
//   }

//   get useRef() {
//     return firestore.doc(`users/${this.uid}`);
//   }

//   get file() {
//     return this.imageInput && this.imageInput.files[0];
//   }

//   handleSidebarOpen = () => {
//     this.setState(prevState => ({
//       SidebarOpen: !prevState.SidebarOpen,
//     }));
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const {
//       user: {
//         authUser: { userName },
//       },
//     } = this.props;

//     if (userName) {
//       this.userRef.update({ userName });
//     }
//     if (this.file) {
//       storage
//         .ref()
//         .child('user-profiles')
//         .child(this.uid)
//         .child(this.file.name)
//         .put(this.file)
//         .then(res => {
//           res.ref.getDownloadURL();
//         })
//         .then(photoURL => this.userRef.update({ photoURL }));
//     }
//   };

//   render() {
//     const { user } = this.props;
//     const { userName, email, photoURL } = user.authUser;
//     const { SidebarOpen } = this.state;
//     return (
//       <StyledWrapper>
//         <Navigation />
//         <GridTemplate>
//           <StyledAccountWrapper>
//             <StyledImageWrapper>
//               <img
//                 src={
//                   photoURL || 'https://capenetworks.com/static/images/testimonials/user-icon.svg'
//                 }
//                 alt={userName}
//               />
//             </StyledImageWrapper>
//             <StyledInfoWrapper>
//               <StyledHeading>{userName}</StyledHeading>
//               <StyledText icon={EmailIcon}>{email}</StyledText>
//               <StyledText icon={JoinedAtIcon}>Joined at 19.02.2020</StyledText>
//             </StyledInfoWrapper>
//             <StyledButtonLogut onClick={() => auth.signOut()}>Log out</StyledButtonLogut>
//           </StyledAccountWrapper>
//           <StyledButton icon={PensilIcon} add onClick={this.handleSidebarOpen} />
//         </GridTemplate>
//         <EditProfile isVisible={SidebarOpen} handleAddPost={this.handleSidebarOpen} user={user} />
//       </StyledWrapper>
//     );
//   }
// }
Account.propTypes = {
  user: PropTypes.object.isRequired,
};
export default Account;
