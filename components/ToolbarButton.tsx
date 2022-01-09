import React from 'react';
import { IToolbarItem } from '../types';

const ToolbarButton = (props) => {
  const { toolbarButton } = props;
  return (
    <div className="toolbarButton">
      <button>
        {props.presentation?.label} is {props.attributes?.visible?.toString()}
        {Math.random().toFixed(4).toString()}
      </button>
    </div>
  );
};
export default ToolbarButton;
