import React from 'react';
import { storiesOf } from '@storybook/react';
import UserCard from './UserCard.tsx';

storiesOf('Atoms/UserCard', module).add('Normal', () => {
  return <UserCard name="card" value="card value" />;
});
