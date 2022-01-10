import React from 'react';
import { IToolbarItem } from './types';
type ComponentProps = {
  toolbarItem: IToolbarItem;
};

const ToggleButton = ({ toolbarItem }: ComponentProps) => {
  return (
    <div>
      <button onClick={(e) => toolbarItem.commands?.click(e)}>
        {toolbarItem.attributes.label}
      </button>
    </div>
  );
};

const TextColorIndicator = ({ toolbarItem }: ComponentProps) => {
  return <div>{toolbarItem.attributes.color}</div>;
};

const Dropdown = ({ toolbarItem }: ComponentProps) => {
  return (
    <div>
      <select onChange={(value) => console.log({ value })}>
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
  fontSize: (toolbarItem) => {
    return <Dropdown toolbarItem={toolbarItem} />;
  },
};
