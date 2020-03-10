import React from 'react';
import { storiesOf } from '@storybook/react';
import HeadingWrapper from './HeadingWrapper';

storiesOf('Atoms/HeadingWrapper', module).add('Normal', () => (
  <HeadingWrapper headingName="Heading" />
));
