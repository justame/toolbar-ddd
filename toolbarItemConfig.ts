import { ContentResolver } from './ContentResolver';
import { RicosToolbar } from './Toolbar';

import { isContainsTextResolver, textColorResolver } from './resolvers';
import { Content } from './Content';
import { IToolbarItemConfig } from './types';

export const configs: IToolbarItemConfig[] = [
  {
    id: 'bold',
    type: 'toggle',
    presentation: {
      label: 'Bold',
    },
    attributes: {
      visible: isContainsTextResolver,
    },
    commands: {
      click:
        ({ attributes, editorCommands }) =>
        (e) => {
          return console.log(e);
        },
    },
  },
  {
    id: 'textColor',
    presentation: {
      label: 'Color',
    },
    type: 'colorPicker',
    attributes: {
      visible: isContainsTextResolver,
      color: textColorResolver,
    },
    commands: {
      click:
        ({ attributes, editorCommands }) =>
        (e) => {
          return console.log(e);
        },
    },
  },
];

const createUpdateAttributes = (toolbarItemId, config) => {
  return (toolbar: RicosToolbar, content) => {
    const toolbarItem = toolbar.getItemById(toolbarItemId);
    if (toolbarItem) {
      Object.keys(config.attributes).forEach((attributeName) => {
        const value = content.resolve(config.attributes[attributeName]);
        toolbarItem.setAttribute(attributeName, value);
      });
    }
  };
};
