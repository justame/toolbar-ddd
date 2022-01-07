import { ToolbarItemConfig, IToolbarItem, ContentResolver } from './types';
export const configs: ToolbarItemConfig[] = [
  {
    id: 'bold',
    type: 'toggle',
    label: 'Bold',
    attributes: {
      visible: {
        id: 'containsText',
        resolve: (content) => {
          console.log(content);
          return (
            Array.isArray(content) &&
            content.map((c) => c?.textContent).indexOf('bold') !== -1
          );
        },
        description: 'contains text',
        defaultValue: false,
      },
    },
  },
  {
    id: 'textColor',
    label: 'Color',
    type: 'colorPicker',
    attributes: {
      visible: {
        id: 'visibleColor',
        resolve: (content) => {
          return true;
        },
        description: 'text color',
        defaultValue: true,
      },
      color: {
        id: 'color',
        resolve: (content) => {
          return 'blue';
        },
        description: 'text color',
        defaultValue: 'blue',
      },
    },
  },
];

export class ToolbarItem implements IToolbarItem {
  attributes = {};
  label = '';
  private constructor(readonly id, label: string) {
    this.label = label;
  }

  setAttribute(key, value) {
    this.attributes[key] = value;
  }
  getAttribute(key) {
    return this.attributes[key];
  }
  static create(id, label) {
    return new ToolbarItem(id, label);
  }
}

export const createToolbarItemByConfig = (config: ToolbarItemConfig) => {
  const toolbarItem = ToolbarItem.create(config.id, config.label);
  Object.keys(config.attributes).forEach((attributeName) => {
    const defaultValue = config.attributes[attributeName].defaultValue;
    toolbarItem.setAttribute(attributeName, defaultValue);
  });

  return toolbarItem;
};

export const resolveAttributes = (
  contentResolver: ContentResolver<any>,
  content
) => {
  return contentResolver.resolve(content);
};

export class Toolbar {
  private constructor(readonly toolbarItems: IToolbarItem[]) {
    // read about private constructor
  }

  static create(toolbarItems: IToolbarItem[]) {
    return new Toolbar(toolbarItems);
  }

  getItemsAttributes() {
    return this.toolbarItems.map((toolbarItem) => {
      return Object.keys(toolbarItem.attributes);
    });
  }
}
