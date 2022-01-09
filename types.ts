import { IContentResolver } from './ContentResolver';

export type IToolbarItem = {
  id: string;
  type: string;
  presentation?: Record<string, any>;
  attributes: Record<string, string | boolean | number>;
};
type Modify<T, R> = Omit<T, keyof R> & R;

export type ToolbarSpec = (toolbarItem: IToolbarItem) => boolean;

export type IToolbarItemConfig = Modify<
  IToolbarItem,
  {
    attributes: Record<string, IContentResolver<any>>;
  }
>;
