import React, { Component } from 'react';
import ToolbarButtonComponent from './ToolbarButton';
import {
  ButtonsAggregator,
  VisibiltyRule,
  IToolbarButtonConfig,
  IToolbarButton,
} from './types';

class ToolbarButton {
  static create(toolbarButton: IToolbarButtonConfig, content): IToolbarButton {
    return {
      label: toolbarButton.button.label,
      icon: toolbarButton.button.icon,
      get disabled() {
        return (
          toolbarButton.disabledRules.length > 0 &&
          toolbarButton.disabledRules.every((rule) => {
            return rule.test(content);
          })
        );
      },
      get visible() {
        return (
          toolbarButton.visiblityRules.length > 0 &&
          toolbarButton.visiblityRules.every((rule) => {
            return rule.test(content);
          })
        );
      },
    };
  }
}

class Buttons implements ButtonsAggregator {
  constructor(private toolbarButtonsConfigs: IToolbarButtonConfig[]) {}

  getRelevantButtons(content) {
    const buttons = this.toolbarButtonsConfigs.map((config) => {
      return ToolbarButton.create(config, content);
    });
    return buttons.filter((button) => {
      return button.visible;
    });
  }
}

type ToolbarProps = {
  content: any;
  buttons: any;
};

class Toolbar extends Component<ToolbarProps, null> {
  buttons: ButtonsAggregator;

  constructor(props) {
    super(props);
    this.buttons = new Buttons(props.buttons);
  }

  render() {
    const { content } = this.props;
    const toolbarButtons = this.buttons.getRelevantButtons(content);

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
