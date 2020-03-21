import * as React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Text from '../Text/Text';
import Heading from '../Heading/Heading';

const StyledWrapper = styled.section<SectionProps>`
  width: 45rem;
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #e6ecf1;
  padding: 2rem 6rem;

  ${({ link }) =>
    link &&
    css`
      :focus,
      :hover {
        background-color: #f5f8fa;
        cursor: pointer;
      }
    `}
`;

const StyledNotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  position: relative;
`;

const StyledAuthorWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledAuthorImage = styled.figure`
  display: flex;
  height: 100%;
  width: 4rem;
  position: absolute;
  top: 1rem;
  left: -13%;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100px;
  }
`;
const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 0;
`;

const StyledDate = styled.span`
  font-size: 1rem;
  margin-top: 6px;
  color: #bec3c9;
  font-weight: ${({ theme }) => theme.regular};
`;

const StyledText = styled(Text)`
  margin-top: 1rem;
`;

interface SectionProps {
  readonly link?: boolean;
}

interface Props {
  content: string;
  id: number | undefined;
  userName: string;
  photoURL: string;
  type: string;
  createdAt: {
    toDate: () => {};
  };
}

const Notification: React.FC<Props> = ({ content, id, userName, photoURL, type, createdAt }) => {
  return (
    <>
      {type === 'post' ? (
        <Link to={`posts/${id}`}>
          <StyledWrapper link>
            <StyledNotificationWrapper>
              <StyledAuthorImage>
                <img src={photoURL} alt={userName} />
              </StyledAuthorImage>
              <StyledAuthorWrapper>
                <StyledArticle>
                  <StyledHeading>{userName}</StyledHeading>
                  <StyledDate>
                    {createdAt.toDate ? moment(createdAt.toDate()).calendar() : 'date'}
                  </StyledDate>
                  <StyledText> {content} </StyledText>
                </StyledArticle>
              </StyledAuthorWrapper>
            </StyledNotificationWrapper>
          </StyledWrapper>
        </Link>
      ) : (
        <StyledWrapper>
          <StyledNotificationWrapper>
            <StyledAuthorImage>
              <img src={photoURL} alt={userName} />
            </StyledAuthorImage>
            <StyledAuthorWrapper>
              <StyledArticle>
                <StyledHeading>{userName}</StyledHeading>
                <StyledDate>
                  {createdAt.toDate ? moment(createdAt.toDate()).calendar() : 'date'}
                </StyledDate>
                <StyledText>{content}</StyledText>
              </StyledArticle>
            </StyledAuthorWrapper>
          </StyledNotificationWrapper>
        </StyledWrapper>
      )}
    </>
  );
};

export default Notification;
