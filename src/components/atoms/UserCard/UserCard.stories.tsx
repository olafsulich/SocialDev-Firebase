import React from 'react';
import { storiesOf } from '@storybook/react';
import UserCard from './UserCard';

storiesOf('Atoms/UserCard', module).add('Normal', () => {
  return <UserCard textName="card" email="example@gmail.com" />;
});
