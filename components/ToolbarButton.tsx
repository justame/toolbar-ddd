import React from 'react';
import { IToolbarItem } from '../types';

const ToolbarButton = (props) => {
  const toolbarButton: IToolbarItem = props.toolbarButton;
  return (
    <div className="toolbarButton">
      <button
        onClick={(e) => {
          toolbarButton.commands?.click(e);
        }}
      >
        {toolbarButton.presentation?.label} is{' '}
        {toolbarButton.attributes?.visible?.toString()}
        {toolbarButton.presentation?.color}
      </button>
    </div>
  );
};

const ColorIndicator = () => {};
export default ToolbarButton;
