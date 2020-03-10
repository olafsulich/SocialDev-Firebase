import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import HomeIcon from '../../../assets/home.svg';

storiesOf('Atoms/Button', module).add('Normal', () => <Button icon={HomeIcon} />);
