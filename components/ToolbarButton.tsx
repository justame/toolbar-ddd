import React from 'react';
import { IToolbarItem } from '../types';

const ToolbarButton = (props) => {
  const { toolbarButton } = props;
  return (
    <div className="toolbarButton">
      <button>
        {toolbarButton.presentation?.label} is{' '}
        {toolbarButton.attributes?.visible?.toString()}
        {toolbarButton.presentation?.color}
      </button>
    </div>
  );
};
export default ToolbarButton;
