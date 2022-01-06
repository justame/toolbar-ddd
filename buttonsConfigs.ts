interface ContentResolver<T> {
  id: string;
  resolver: (content) => any;
  description: string;
  defaultValue: T;
}

interface ToolbarItemConfig {
  id: string;
  type: string;
  attributes: Map<string, ContentResolver<any>>;
}

export const configs = [
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

class ToolbarButton {
  private constructor(private id, private attributes) {}

  static create(id, attributes) {
    return new ToolbarButton(id, attributes);
  }
}

export const configToToolbarItem = (config) => {
  const attribues = Object.keys(config.attributes).reduce(
    (acc, attributeName) => {
      acc[attributeName] = attribues[attributeName].defaultValue;
      return acc;
    },
    {}
  );
  const toolbarButton = ToolbarButton.create(config.id, attribues);
  return toolbarButton;
};

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
