import React from 'react';
import { IToolbarItem } from './types';
type ComponentProps = {
  toolbarItem: IToolbarItem;
};

const ToggleButton = ({ toolbarItem }: ComponentProps) => {
  return (
    <div>
      <button onClick={(e) => toolbarItem.commands?.click(e)}>
        {toolbarItem.presentation.label}
      </button>
    </div>
  );
};

const TextColorIndicator = ({ toolbarItem }: ComponentProps) => {
  return (
    <div
      style={{
        backgroundColor: toolbarItem.attributes.color,
        width: 30,
        height: 30,
      }}
    >
      {toolbarItem.attributes.color}
    </div>
  );
};

const FontDropDown = ({ toolbarItem }: ComponentProps) => {
  return (
    <div>
      <select
        onChange={(e) => {
          toolbarItem.commands.changeFont(e.target.selectedOptions[0].value);
        }}
      >
        <option value="Roboto">Roboto</option>
        <option value="Arial">Arial</option>
        <option value="Helveticate">Helveticate</option>
        <option value="David">David</option>
      </select>
    </div>
  );
};

export const toolbarItemsRenders = {
  toggle: (toolbarItem) => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  textColorIndicator: (toolbarItem) => {
    return <TextColorIndicator toolbarItem={toolbarItem} />;
  },
  font: (toolbarItem) => {
    return <FontDropDown toolbarItem={toolbarItem} />;
  },
};
