import { IContentResolver } from './ContentResolver';

export interface IToolbarItem {
  id: string;
  presentation?: Record<string, any>;
  label: string;
  attributes: Record<string, any>;
  setAttribute: (key, value) => void;
  getAttribute: (key) => any;
}

export type ToolbarSpec = (toolbarItem: IToolbarItem) => boolean;

export interface IToolbarItemConfig {
  id: string;
  type: string;
  label: string;
  attributes: Record<string, IContentResolver<string | boolean | number>>;
}
