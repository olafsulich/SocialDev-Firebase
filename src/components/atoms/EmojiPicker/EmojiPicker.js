import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const EmojiPicker = ({ bottom, right, handleAddEmoji }) => (
  <Picker
    set="messenger"
    style={{ position: 'absolute', bottom: { bottom }, right: { right }, zIndex: '10' }}
    darkMode={false}
    onSelect={handleAddEmoji}
    showSkinTones={false}
    showPreview={false}
    color="#1ca0f2"
  />
);

EmojiPicker.propTypes = {
  bottom: PropTypes.object.isRequired,
  right: PropTypes.object.isRequired,
  handleAddEmoji: PropTypes.func.isRequired,
};
export default EmojiPicker;
