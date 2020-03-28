import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

interface Props {
  top: string;
  right: string;
  handleAddEmoji?: any;
}

const EmojiPicker: React.FC<Props> = ({ top, right, handleAddEmoji }) => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setPageWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [pageWidth]);
  return (
    <>
      {pageWidth >= 700 ? (
        <Picker
          set="messenger"
          style={{ position: 'absolute', top: `${top}`, right: `${right}`, zIndex: 10 }}
          darkMode={false}
          onSelect={handleAddEmoji}
          showSkinTones={false}
          showPreview={false}
          color="#1ca0f2"
        />
      ) : null}
    </>
  );
};

export default EmojiPicker;
