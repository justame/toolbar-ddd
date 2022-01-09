import { IToolbarItem, ToolbarSpec, IToolbarItemConfig } from './types';

import EventEmitter from './EventEmitter';
import { Content } from './Content';

//ricosToolbar
type ToolbarItemCreator = (content: Content) => IToolbarItem;

export class ToolbarItem {
  static create(toolbarItemConfig: IToolbarItemConfig): ToolbarItemCreator {
    return (content) => {
      const toolbarItem = {
        id: toolbarItemConfig.id,
        presentation: toolbarItemConfig.presentation,
        type: toolbarItemConfig.type,
        attributes: {},
        commands: {},
      };

      Object.keys(toolbarItemConfig.commands).forEach((commandName) => {
        toolbarItem.commands[commandName] = toolbarItemConfig.commands[
          commandName
        ]({
          attributes: toolbarItem.attributes,
          editorCommands: {},
        });
      });

      Object.keys(toolbarItemConfig.attributes).forEach((attributeName) => {
        toolbarItem.attributes[attributeName] = content.resolve(
          toolbarItemConfig.attributes[attributeName]
        );
      });

      return toolbarItem;
    };
  }
}

type RicosToolbarProps = {
  toolbarItemCreators: ToolbarItemCreator[];
  content: Content;
  editor: any;
};

export class RicosToolbar extends EventEmitter {
  static EVENTS = {
    toolbarsCreated: 'toolbarsCreated',
  };
  private toolbarItems: IToolbarItem[] = [];
  private toolbarItemCreators: ToolbarItemCreator[];
  private content: Content;
  private editor = null;

  static create({ toolbarItemCreators, content, editor }: RicosToolbarProps) {
    return new RicosToolbar({ toolbarItemCreators, content, editor });
  }

  private constructor({
    toolbarItemCreators,
    content,
    editor,
  }: RicosToolbarProps) {
    super();
    this.toolbarItems = [];
    this.toolbarItemCreators = toolbarItemCreators;
    this.content = content;
    this.editor = editor;

    console.log(this.editor);

    this.toolbarItems = this.createToolbarItems();

    content.on(Content.EVENTS.contentChangeEvent, () => {
      const previousToolbarItems = Object.freeze(this.toolbarItems);
      this.toolbarItems = this.createToolbarItems();

      this.emit(RicosToolbar.EVENTS.toolbarsCreated, {
        previousToolbarItems,
        toolbarItems: Object.freeze(this.toolbarItems),
      });
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
