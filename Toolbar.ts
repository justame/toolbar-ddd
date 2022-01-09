import {
  IToolbarItem,
  ToolbarSpec,
  IToolbarItemConfig,
  Content,
} from './types';
import { ToolbarItem } from './ToolbarItem';
import EventEmitter from './EventEmitter';

//ricosToolbar
export class Toolbar extends EventEmitter {
  readonly toolbarItems: IToolbarItem[] = [];

  static create(configs: IToolbarItemConfig[], content: Content) {
    return new Toolbar(configs, content);
  }

  private constructor(configs, content) {
    super();
    configs.forEach((config) => {
      this.createToolbarItemByConfig(config);
    });

    content.on('change', (contentChangeEvent) => {
      // updateButtons
    });
  }

  private createToolbarItemByConfig = (config: IToolbarItemConfig) => {
    const toolbarItem = ToolbarItem.create(config.id, config.label);
    // set default values
    Object.keys(config.attributes).forEach((attributeName) => {
      const defaultValue = config.attributes[attributeName].defaultValue;
      toolbarItem.setAttribute(attributeName, defaultValue);
    });

    return toolbarItem;
  };

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
