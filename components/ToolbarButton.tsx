import React from 'react';

const ToolbarButton = (props) => {
  return (
    <div className="toolbarButton">
      <button
        onClick={() => props.onClick(props.label)}
        disabled={props.disabled}
      >
        {props.label}
      </button>
    </div>
  );
};
export default ToolbarButton;
