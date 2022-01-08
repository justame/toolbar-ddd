




export interface IToolbarItem {
  id: string;
  label: string;
  attributes: ToolbarItemConfig['attributes'];
  setAttribute: (key, value) => void;
  getAttribute: (key) => any;
}

export type ToolbarSpec = (toolbarItem: IToolbarItem) => boolean;
