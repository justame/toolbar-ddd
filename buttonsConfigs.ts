interface ContentResolver<T> {
  id: string;
  resolver: (content) => T;
  description: string;
  defaultValue: T;
}

interface ToolbarItemConfig {
  id: string;
  type: string;
  attributes: Record<string, ContentResolver<number | string | boolean>>;
}

export const configs: ToolbarItemConfig[] = [
  {
    id: 'bold',
    type: 'toggle',
    attributes: {
      visible: {
        id: 'containsText',
        resolver: (content) => {
          return !!content.nodes[0];
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
        resolver: (content) => {
          return content.nodes[0].color;
        },
        description: 'text color',
        defaultValue: 'blue',
      },
    },
  },
];

interface IToolbarItem {
  attributes: ToolbarItemConfig['attributes'];
  setAttribute: (key, value) => void;
}

export class ToolbarItem implements IToolbarItem {
  private constructor(private id, readonly attributes) {}

  setAttribute(key, value) {
    this.attributes[key] = value;
  }
  static create(id, attributes) {
    return new ToolbarItem(id, attributes);
  }
}

export const configToToolbarItem = (config: ToolbarItemConfig) => {
  const attribues = Object.keys(config.attributes).reduce(
    (acc, attributeName) => {
      acc[attributeName] = config.attributes[attributeName].defaultValue;
      return acc;
    },
    {}
  );
  const toolbarButton = ToolbarItem.create(config.id, attribues);
  return {
    toolbarButton,
    updateAttributesByContent: (content) => {
      for (const attribute in config.attributes) {
        toolbarButton.setAttribute(
          attribute,
          config.attributes[attribute].resolver(content)
        );
      }
    },
  };
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
