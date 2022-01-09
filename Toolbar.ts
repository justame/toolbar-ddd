import { IToolbarItem, ToolbarSpec, IToolbarItemConfig } from './types';
import { ToolbarItem } from './ToolbarItem';
import EventEmitter from './EventEmitter';
import { Content } from './Content';

//ricosToolbar
export class Toolbar extends EventEmitter {
  readonly toolbarItems: IToolbarItem[] = [];
  content: Content;
  itemConfigMap = {};
  static create(configs: IToolbarItemConfig[], content: Content) {
    return new Toolbar(configs, content);
  }

  private constructor(configs, content) {
    super();
    configs.forEach((config) => {
      this.addToolbarItem(this.createToolbarItemByConfig(config));
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
    this.itemConfigMap[toolbarItem.id] = config;
    this.updateToolbarItemAttributes(toolbarItem.id);
    return toolbarItem;
  };

  private updateToolbarItemAttributes(toolbarItemId) {
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
