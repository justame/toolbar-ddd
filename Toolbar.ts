import { IToolbarItem, ToolbarSpec, IToolbarItemConfig } from './types';

import EventEmitter from './EventEmitter';
import { Content } from './Content';

//ricosToolbar

class ToolbarItem {
  static from(
    toolbarItemConfig: IToolbarItemConfig,
    content: Content
  ): IToolbarItem {
    const toolbarItem = {
      id: toolbarItemConfig.id,
      presentation: toolbarItemConfig.presentation,
      type: toolbarItemConfig.type,
      attributes: {},
    };
    if (!content.isEmpty()) {
      Object.keys(toolbarItemConfig.attributes).forEach((attributeName) => {
        toolbarItem.attributes[attributeName] = content.resolve(
          toolbarItemConfig.attributes[attributeName]
        );
      });
    }

    return toolbarItem;
  }
}
export class Toolbar extends EventEmitter {
  readonly toolbarItems: IToolbarItem[] = [];

  static create(configs: IToolbarItemConfig[], content: Content) {
    return new Toolbar(configs, content);
  }

  private constructor(private configs, private content) {
    super();
    configs.forEach((config) => {
      const toolbarItem = ToolbarItem.from(config, this.content);
      this.addToolbarItem(toolbarItem);
    });

    content.on('change', (contentChangeEvent) => {
      // updateButtons
    });
  }

  private createToolbarItemByConfig = (
    config: IToolbarItemConfig
  ): IToolbarItem => {
    const toolbarItem: IToolbarItem = {
      id: config.id,
      presentation: config.presentation,
      type: config.type,
      attributes: {},
    };

    return toolbarItem;
  };

  private updateToolbarItemAttributes(toolbarItemId) {
    ToolbarItem.from(this.configs, this.content);
    const { attributes } = this.itemConfigMap[toolbarItemId];

    const toolbarItem = this.toolbarItems.find(
      (toolbarItem) => toolbarItem.id === toolbarItem.id
    );

    Object.keys(attributes).forEach((attributeName) => {
      toolbarItem.attributes[attributeName] = this.content.resolve(
        attributes[attributeName]
      );
    });
  }

  getItemsBy(spec: ToolbarSpec) {
    return this.toolbarItems.filter(spec);
  }

  getItemById(id) {
    return this.toolbarItems.find((item) => item.id === id);
  }

  addToolbarItem(toolbarItem: IToolbarItem) {
    // validate no duplicate id
    this.toolbarItems.push(toolbarItem);
  }
}
