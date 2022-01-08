import { IContentResolver } from './ContentResolver';

export interface IToolbarItem {
  id: string;
  label: string;
  attributes: Record<string, IContentResolver<any>>;
  setAttribute: (key, value) => void;
  getAttribute: (key) => any;
}

export type ToolbarSpec = (toolbarItem: IToolbarItem) => boolean;
