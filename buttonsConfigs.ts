import { ToolbarItem } from './ToolbarItem';
import { ContentResolver } from './ContentResolver';

import { isContainsTextResolver, textColorResolver } from './resolvers';
import { Content } from './Content';

interface ToolbarItemConfig {
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
  },
  {
    id: 'textColor',
    label: 'Color',
    type: 'colorPicker',
    attributes: {
      visible: isContainsTextResolver,
      color: textColorResolver,
    },
  },
];

export const createToolbarItemByConfig = (config: ToolbarItemConfig) => {
  const toolbarItem = ToolbarItem.create(config.id, config.label);
  // set default values
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
