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
} from './types';

class ButtonsManager implements ButtonsAggregator<IEditorContent> {
  constructor(private toolbarsButtons: IToggleButtonCreator[]) {}
  getRelevantButtons(content: IEditorContent) {
    return this.toolbarsButtons
      .map((buttonCreator) => {
        const button = buttonCreator(content);
        return button;
      })
      .filter((button) => {
        return button.visible;
      });
  }
}

type ToolbarProps = {
  content: any;
  buttons: IToggleButtonCreator[];
};

class Toolbar extends Component<ToolbarProps, null> {
  buttons: IToggleButtonCreator[];
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
