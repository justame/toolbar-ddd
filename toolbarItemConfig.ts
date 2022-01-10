import { ContentResolver } from './ContentResolver';
import { RicosToolbar } from './Toolbar';

import {
  isContainsTextResolver,
  textColorResolver,
  alwaysVisible,
  onlyImageSelected,
} from './resolvers';
import { IToolbarItemConfig } from './types';

export const staticToolbarConfig: IToolbarItemConfig[] = [
  {
    id: 'bold',
    type: 'toggle',
    presentation: {
      label: 'Bold',
    },
    attributes: {
      visible: alwaysVisible,
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
    type: 'textColorIndicator',
    attributes: {
      visible: alwaysVisible,
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
  {
    id: 'fontFamily',
    presentation: {},
    type: 'font',
    attributes: {
      visible: alwaysVisible,
    },
    commands: {
      changeFont:
        ({ attributes, editorCommands }) =>
        (e) => {
          return console.log(e);
        },
    },
  },
  {
    id: 'imageSettings',
    presentation: {
      label: 'Color',
    },
    type: 'imageSettings',
    attributes: {
      visible: onlyImageSelected,
    },
    commands: {
      changeFont:
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
    type: 'textColorIndicator',
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
