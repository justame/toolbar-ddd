import { ContentResolver } from './ContentResolver';
import { RicosToolbar } from './Toolbar';

import { isContainsTextResolver, textColorResolver } from './resolvers';
import { IToolbarItemConfig } from './types';

export const staticToolbarConfig: IToolbarItemConfig[] = [
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
          editorCommands.chain().focus().toggleBold().run();
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

export const floatingToolbarConfig: IToolbarItemConfig[] = [
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
          editorCommands.chain().focus().toggleBold().run();
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
