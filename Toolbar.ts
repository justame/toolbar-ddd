import { IToolbarItem, ToolbarSpec, IToolbarItemConfig } from './types';

import EventEmitter from './EventEmitter';
import { Content } from './Content';

//ricosToolbar
type ToolbarItemCreator = (content: Content) => IToolbarItem;

class ToolbarItem {
  static create(toolbarItemConfig: IToolbarItemConfig): ToolbarItemCreator {
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
  private toolbarItems: IToolbarItem[] = [];
  private toolbarItemCreators: IToolbarItemConfig[];

  static create({ toolbarItemCreators, content }: RicosToolbarProps) {
    return new RicosToolbar({ toolbarItemCreators, content });
  }

  private constructor({ toolbarItemCreators, content }: RicosToolbarProps) {
    super();
    this.toolbarItems = [];
    this.toolbarItemCreators = toolbarItemCreators;

    this.toolbarItems = this.toolbarItemCreators.map((config) => {
      return ToolbarItem.create(config)(content);
    });

    content.on('change', () => {
      this.toolbarItems = this.toolbarItemCreators.map((config) => {
        return ToolbarItem.create(config)(content);
      });
    });
  }

  private addToolbarItem(toolbarItem: IToolbarItem) {
    this.toolbarItems.push(toolbarItem);
  }

  getItems() {
    return this.toolbarItems;
  }

  getItemsBy(spec: ToolbarSpec) {
    return this.toolbarItems.filter(spec);
  }

  getItemById(id) {
    return this.toolbarItems.find((item) => item.id === id);
  }
}
