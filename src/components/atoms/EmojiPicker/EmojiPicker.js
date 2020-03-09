import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const EmojiPicker = ({ top, right, handleAddEmoji }) => {
  return (
    <Picker
      set="messenger"
      style={{ position: 'absolute', top: `${top}`, right: `${right}`, zIndex: '10' }}
      darkMode={false}
      onSelect={handleAddEmoji}
      showSkinTones={false}
      showPreview={false}
      color="#1ca0f2"
    />
  );
};

EmojiPicker.propTypes = {
  top: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  handleAddEmoji: PropTypes.func.isRequired,
};
export default EmojiPicker;
