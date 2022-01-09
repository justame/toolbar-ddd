import React, { Component } from 'react';
import ToolbarButtonComponent from './ToolbarButton';
import { IToolbarItem, ToolbarSpec } from '../types';
import { Toolbar } from '../Toolbar';
import { ToolbarItemConfig } from '../buttonsConfigs';
import { ToolbarItem } from '../ToolbarItem';
import { Content } from '../Content';

type ToolbarProps = {
  toolbar: Toolbar;
  configs: any;
  content: any;
};

const visibleOnlySpec: ToolbarSpec = (toolbarItem) =>
  // toolbarItem.getAttribute('visible');
  true;

const updateAttributes = (config, toolbarItem, content, ref) => {
  if (toolbarItem) {
    console.log('itemDOM', ref);
    Object.keys(config.attributes).forEach((attributeName) => {
      const value = content.resolve(config.attributes[attributeName]);
      toolbarItem.setAttribute(attributeName, value);
    });
  }
};

const createToolbarItemByConfig = (config: ToolbarItemConfig) => {
  const toolbarItem = ToolbarItem.create(config.id, config.label);
  // set default values
  Object.keys(config.attributes).forEach((attributeName) => {
    const defaultValue = config.attributes[attributeName].defaultValue;
    toolbarItem.setAttribute(attributeName, defaultValue);
  });

  return toolbarItem;
};

//RicosToolbar

class ToolbarComponent extends Component<ToolbarProps, {}> {
  toolbar: Toolbar = null;
  items: Record<string, any> = {};
  state = {};
  constructor(props) {
    super(props);

    this.toolbar = this.props.toolbar;
    const { configs } = this.props;
    configs.forEach((config) => {
      const toolbarItem = createToolbarItemByConfig(config);
      this.toolbar.addToolbarItem(toolbarItem);
    });
  }

  componentWillReceiveProps(props) {
    const content = Content.create(props.content);
    const toolbar: Toolbar = props.toolbar;
    console.log(this.items);
    toolbar.toolbarItems.forEach((toolbarItem) => {
      const config = props.configs.find((config) => config.id);
      updateAttributes(
        config,
        toolbarItem,
        content,
        this.items[toolbarItem.id]
      );
    });

    return null;
  }

  componentDidMount() {
    const content = Content.create(this.props.content);
    const toolbar: Toolbar = this.props.toolbar;
    console.log(this.items);
    toolbar.toolbarItems.forEach((toolbarItem) => {
      const config = this.props.configs.find((config) => config.id);
      updateAttributes(
        config,
        toolbarItem,
        content,
        this.items[toolbarItem.id]
      );
    });
  }

  render() {
    const toolbarButtons = this.toolbar.getItemsBy(visibleOnlySpec);

    return (
      <div className="toolbar">
        {toolbarButtons.map((toolbarButton, index) => {
          return (
            <div
              ref={(item) => {
                this.items[toolbarButton.id] = item;
              }}
            >
              <ToolbarButtonComponent
                key={index}
                {...toolbarButton.attributes}
                label={toolbarButton.label}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ToolbarComponent;
