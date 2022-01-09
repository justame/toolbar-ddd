import { IToolbarItem, ToolbarSpec, IToolbarItemConfig } from './types';

import EventEmitter from './EventEmitter';
import { Content } from './Content';

//ricosToolbar
type ToolbarItemCreator = (content: Content) => IToolbarItem;

export class ToolbarItem {
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
  toolbarItemCreators: ToolbarItemCreator[];
  content: Content;
};

export class RicosToolbar extends EventEmitter {
  static EVENTS = {
    toolbarsCreated: 'toolbarsCreated',
  };
  private toolbarItems: IToolbarItem[] = [];
  private toolbarItemCreators: ToolbarItemCreator[];
  private content: Content;

  static create({ toolbarItemCreators, content }: RicosToolbarProps) {
    return new RicosToolbar({ toolbarItemCreators, content });
  }

  private constructor({ toolbarItemCreators, content }: RicosToolbarProps) {
    super();
    this.toolbarItems = [];
    this.toolbarItemCreators = toolbarItemCreators;
    this.content = content;

    this.toolbarItems = this.createToolbarItems();

    content.on(Content.EVENTS.contentChangeEvent, () => {
      console.log('on change@!!!');
      this.toolbarItems = this.createToolbarItems();
      this.emit(RicosToolbar.EVENTS.toolbarsCreated);
    });
  }

  private createToolbarItems() {
    return this.toolbarItemCreators.map((toolbarItemCreator) => {
      return toolbarItemCreator(this.content);
    });
  }

  addToolbarItemCreator(toolbarItemCreator: ToolbarItemCreator) {
    this.toolbarItemCreators.push(toolbarItemCreator);
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
