import React, { Component } from 'react';
import ToolbarButtonComponent from './ToolbarButton';
import { IToolbarItem, ToolbarSpec } from '../types';
import { Toolbar } from '../Toolbar';
import { ToolbarItemConfig } from '../buttonsConfigs';
import { ToolbarItem } from '../ToolbarItem';
import { Content } from '../Content';

type ToolbarProps = {
  toolbar: Toolbar;
};

const visibleOnlySpec: ToolbarSpec = (toolbarItem) =>
  // toolbarItem.getAttribute('visible');
  true;

//RicosToolbar

class ToolbarComponent extends Component<ToolbarProps, {}> {
  toolbar: Toolbar = null;
  items: Record<string, any> = {};
  state = {};
  constructor(props) {
    super(props);
    this.toolbar = props.toolbar;
  }

  render() {
    const toolbarButtons = this.toolbar.getItemsBy(visibleOnlySpec);

    return (
      <div className="toolbar">
        {toolbarButtons.map((toolbarButton, index) => {
          return (
            <div
              key={toolbarButton.id}
              ref={(item) => {
                this.items[toolbarButton.id] = item;
              }}
            >
              <ToolbarButtonComponent
                key={index}
                {...toolbarButton.attributes}
                label={toolbarButton.presentation.label}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ToolbarComponent;
