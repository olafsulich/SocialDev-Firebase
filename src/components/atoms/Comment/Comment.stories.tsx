import React from 'react';
import { storiesOf } from '@storybook/react';
import Comment from './Comment';

storiesOf('Atoms/Comment', module).add('Normal', () => (
  <Comment content="new comment" userName="user" />
));
