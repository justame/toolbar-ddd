import React, { Component } from 'react';
import ToolbarButtonComponent from './ToolbarButton';
import {
  ButtonsAggregator,
  IVisibiltyRule,
  IToolbarButtonConfig,
  IToolbarButtonBase,
  IRicosContent,
  IEditorContent,
  IToggleButton,
  IToolbarButton,
  IToggleButtonCreator,
  IToolbarItem,
  ToolbarSpec,
} from './types';

import { Toolbar } from './buttonsConfigs';
class ButtonsManager implements ButtonsAggregator {
  constructor(private toolbarItems: IToolbarItem[]) {}
  getVisibleItems() {
    //toolbar.getItemsBySpec(visible)
    console.log(this.toolbarItems);
    return this.toolbarItems.filter((toolbarItem) => {
      return !!toolbarItem.getAttribute('visible');
    });
  }
}

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
