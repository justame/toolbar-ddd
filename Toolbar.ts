import { IToolbarItem, ToolbarSpec } from './types';

export class Toolbar {
  id: string;
  readonly toolbarItems: IToolbarItem[] = [];
  private constructor() {
    // read about private constructor
  }

  static create() {
    return new Toolbar();
  }

  getItemsBy(spec: ToolbarSpec) {
    return this.toolbarItems.filter(spec);
  }

  addToolbarItem(toolbarItem: IToolbarItem) {
    // validate no duplicate id
    this.toolbarItems.push(toolbarItem);
  }
}
