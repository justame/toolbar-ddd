import { ContentResolver } from './ContentResolver';
import { RicosToolbar } from './Toolbar';
import { BoldIcon, ItalicIcon } from './icons';

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
      tooltip: 'Bold',
      icon: BoldIcon,
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
    id: 'italic',
    type: 'toggle',
    presentation: {
      tooltip: 'Italic',
      icon: ItalicIcon,
    },
    attributes: {
      visible: alwaysVisible,
    },
    commands: {
      click:
        ({ attributes, editorCommands }) =>
        (e) => {
          editorCommands.chain().focus().toggleItalic().run();
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
  {
    id: 'textType',
    presentation: {},
    type: 'textType',
    attributes: {
      visible: alwaysVisible,
      textType: ContentResolver.create({
        resolve: (content) => {
          return Array.isArray(content) && content && content[0].type.name;
        },
        description: 'resolve text type',
      }),
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
