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
} from './types';

class ButtonsManager implements ButtonsAggregator<IEditorContent> {
  constructor(private toolbarItems: IToolbarItem[]) {}
  getVisibleItems(content: IEditorContent) {
    return this.toolbarItems.filter((toolbarItem) => {
      return !!toolbarItem.getAttribute('visible');
    });
  }
}

type ToolbarProps = {
  buttons: IToolbarItem[];
};

class Toolbar extends Component<ToolbarProps, null> {
  buttons: IToolbarItem[];
  buttonsManager: ButtonsAggregator<IEditorContent>;

  constructor(props) {
    super(props);
    this.buttonsManager = new ButtonsManager(this.props.buttons);
  }

  render() {
    const { content } = this.props;
    const toolbarButtons = this.buttonsManager.getRelevantButtons(content);

    // add logic to render button by type
    return (
      <div className="toolbar">
        {toolbarButtons.map((toolbarButton, index) => {
          return <ToolbarButtonComponent key={index} {...toolbarButton} />;
        })}
      </div>
    );
  }
}

export default Toolbar;
