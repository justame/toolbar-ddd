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
        {Math.random().toFixed(4).toString()}
      </button>
    </div>
  );
};
export default ToolbarButton;
