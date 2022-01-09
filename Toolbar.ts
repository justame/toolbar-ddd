import { IToolbarItem, ToolbarSpec, IToolbarItemConfig } from './types';

import EventEmitter from './EventEmitter';
import { Content } from './Content';

//ricosToolbar
type ToolbarCreator = (content: Content) => IToolbarItem;

const  toolbarItemCreator;
class ToolbarItemCreator {
  static create(toolbarItemConfig: IToolbarItemConfig): ToolbarCreator {
    return (content) => {
      const toolbarItemCreator = {
        id: toolbarItemConfig.id,
        presentation: toolbarItemConfig.presentation,
        type: toolbarItemConfig.type,
        attributes: {},
      };

      if (!content.isEmpty()) {
        Object.keys(toolbarItemConfig.attributes).forEach((attributeName) => {
          toolbarItemCreator.attributes[attributeName] = content.resolve(
            toolbarItemConfig.attributes[attributeName]
          );
        });
      }
      return toolbarItemCreator;
    };
  }
}

type RicosToolbarProps = {
  toolbarItemCreators: IToolbarItemConfig[];
  content: Content;
};

export class RicosToolbar extends EventEmitter {
  readonly toolbarItems: IToolbarItem[] = [];
  private toolbarItemCreators: IToolbarItemConfig[];

  static create({ toolbarItemCreators, content }: RicosToolbarProps) {
    return new RicosToolbar({ toolbarItemCreators, content });
  }

  private constructor({ toolbarItemCreators, content }: RicosToolbarProps) {
    super();
    this.toolbarItemCreators = toolbarItemCreators;

    toolbarItemCreators.forEach((config) => {
      const toolbarItem = ToolbarItem.create(config)(content);
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
