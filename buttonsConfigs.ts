import { ToolbarItem } from './ToolbarItem';
import { ContentResolver } from './ContentResolver';
import { Toolbar } from './Toolbar';

import { isContainsTextResolver, textColorResolver } from './resolvers';
import { Content } from './Content';

export interface ToolbarItemConfig {
  id: string;
  type: string;
  label: string;
  attributes: Record<string, ContentResolver>;
}

export const configs: ToolbarItemConfig[] = [
  {
    id: 'bold',
    type: 'toggle',
    label: 'Bold',
    attributes: {
      visible: isContainsTextResolver,
    },
    // commands: {
    //   click: ({ attributes, editorCommands, getPosition }) => {
    //     return editorCommands.toggleInline('bold');
    //   },
    // },
  },
  {
    id: 'textColor',
    label: 'Color',
    type: 'colorPicker',
    attributes: {
      visible: isContainsTextResolver,
      color: textColorResolver,
    },
    // commands: {
    //   click: ({ toolbarItem, editorCommands }) => {
    //     return editorCommands.toggleInline('bold');
    //   },
  },
];

const createUpdateAttributes = (toolbarItemId, config) => {
  return (toolbar: Toolbar, content) => {
    const toolbarItem = toolbar.getItemById(toolbarItemId);
    if (toolbarItem) {
      Object.keys(config.attributes).forEach((attributeName) => {
        const value = content.resolve(config.attributes[attributeName]);
        toolbarItem.setAttribute(attributeName, value);
      });
    }
  };
};
