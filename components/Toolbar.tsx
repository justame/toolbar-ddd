import React, { Component } from 'react';
import ToolbarButtonComponent from './ToolbarButton';
import { IToolbarItem, ToolbarSpec } from '../types';
import { RicosToolbar } from '../Toolbar';
import { ToolbarItem } from '../ToolbarItem';
import { Content } from '../Content';

type ToolbarProps = {
  toolbar: RicosToolbar;
};

const visibleOnlySpec: ToolbarSpec = (toolbarItem) =>
  // toolbarItem.getAttribute('visible');
  true;

//RicosToolbar

class ToolbarComponent extends Component<ToolbarProps, {}> {
  toolbar: RicosToolbar = null;
  items: Record<string, any> = {};
  state = {
    dummyUpdate: 1,
  };
  constructor(props) {
    super(props);
    this.toolbar = props.toolbar;
    this.toolbar.on(RicosToolbar.EVENTS.toolbarsCreated, () => {
      this.setState({ dummyUpdate: this.state.dummyUpdate + 1 });
    });
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
                toolbarButton={toolbarButton}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ToolbarComponent;
