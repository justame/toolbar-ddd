import { ToolbarItemConfig } from './types';
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
        resolve: (content = []) => {
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

export const getAttributesIdsByConfig = (config) => {
  const attributesIds = Object.keys(config.attributes).map((attribues) => {
    return config.attributes[attribues].id;
  });

  return attributesIds;
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

// type ContentSelector = (content) => any;

// interface ContentAttributeResolver {
//   resolve: ContentSelector;
//   name
// }

// {
//   name: 'visible',
//   resolver( content )= > content.nodes[0].type === 'P'
// }

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
