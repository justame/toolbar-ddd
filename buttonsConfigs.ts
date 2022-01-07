import {
  ToolbarItemConfig,
  IToolbarItem,
  ToolbarSpec,
  ContentResolver,
} from './types';
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
  // default values
  Object.keys(config.attributes).forEach((attributeName) => {
    const defaultValue = config.attributes[attributeName].defaultValue;
    toolbarItem.setAttribute(attributeName, defaultValue);
  });

  const updateAttributes = (content: Content) => {
    Object.keys(config.attributes).forEach((attributeName) => {
      const value = content.resolve(config.attributes[attributeName]);
      toolbarItem.setAttribute(attributeName, value);
    });
  };
  return { toolbarItem, updateAttributes };
};

export class Content {
  private constructor(private content) {}
  private resolved = {};
  resolve(contentResolver: ContentResolver<any>) {
    if (this.resolved[contentResolver.id]) {
      return this.resolved[contentResolver.id];
    } else {
      this.resolved[contentResolver.id] = contentResolver.resolve(this.content);
    }
    return this.resolved[contentResolver.id];
  }
  static create(content) {
    return new Content(content);
  }
}

export class Toolbar {
  id: string;
  readonly toolbarItems: IToolbarItem[] = [];
  private constructor() {
    // read about private constructor
  }

  static create() {
    return new Toolbar();
  }

  getItemsBy(spec: ToolbarSpec) {
    return this.toolbarItems.filter(spec);
  }

  addToolbarItem(toolbarItem: IToolbarItem) {
    // validate no duplicate id
    this.toolbarItems.push(toolbarItem);
  }
}
