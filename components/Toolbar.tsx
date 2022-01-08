import React, { Component } from 'react';
import ToolbarButtonComponent from './ToolbarButton';
import { IToolbarItem, ToolbarSpec } from '../types';
import { Toolbar } from '../Toolbar';

type ToolbarProps = {
  toolbar: Toolbar;
};

const visibleItemsSpec: ToolbarSpec = (toolbarItem) =>
  toolbarItem.getAttribute('visible');

class ToolbarComponent extends Component<ToolbarProps, null> {
  toolbar: Toolbar = null;

  constructor(props) {
    super(props);
    this.toolbar = this.props.toolbar;
  }

  render() {
    const toolbarButtons = this.toolbar.getItemsBy(visibleItemsSpec);

    return (
      <div className="toolbar">
        {toolbarButtons.map((toolbarButton, index) => {
          return (
            <ToolbarButtonComponent
              key={index}
              {...toolbarButton.attributes}
              label={toolbarButton.label}
            />
          );
        })}
      </div>
    );
  }
}

export default ToolbarComponent;
