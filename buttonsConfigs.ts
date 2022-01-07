import { ToolbarItemConfig, IToolbarItem, ContentResolver } from './types';
export const configs: ToolbarItemConfig[] = [
  {
    id: 'bold',
    type: 'toggle',
    attributes: {
      visible: {
        id: 'containsText',
        resolve: (content) => {
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
    type: 'colorPicker',
    attributes: {
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
  private constructor(readonly id) {}

  setAttribute(key, value) {
    this.attributes[key] = value;
  }
  getAttribute(key) {
    return this.attributes[key];
  }
  static create(id) {
    return new ToolbarItem(id);
  }
}

export const createToolbarItemByConfig = (config: ToolbarItemConfig) => {
  const toolbarItem = ToolbarItem.create(config.id);
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

// const attribute = {
//   name: 'color',
//   value: 'red'
// }

// toolbarItem.setAttribute(attribute)

// resolved
// resolver
// class ContentAttribute {
//   private constructor(id, selector) {

//   }

//   create(){
//     new ContentSelector(id, selector: ContentSelector);
//   }
// }

// const contentAttribute = {
//   id: 'bold',
//   selector: (content) => {
//     return content.nodes[0];
//   }
// }

// const buttonsConfigs = [
//   {
//     id: 'bold',
//     attributes: [],
//   },
// ];
