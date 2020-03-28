import React from 'react';
import { storiesOf } from '@storybook/react';
import EmojiPicker from './EmojiPicker';

storiesOf('Atoms/EmojiPicker', module).add('Normal', () => <EmojiPicker top="0" right="0" />);
