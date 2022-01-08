import { IToolbarItem, ToolbarSpec } from './types';

export class Toolbar {
  readonly toolbarItems: IToolbarItem[] = [];
  private constructor() {}

  static create() {
    return new Toolbar();
  }

  getItemsBy(spec: ToolbarSpec) {
    return this.toolbarItems.filter(spec);
  }

  getItemById(id) {
    return this.toolbarItems.find((item) => item.id === id);
  }

  addToolbarItem(toolbarItem: IToolbarItem) {
    // validate no duplicate id
    this.toolbarItems.push(toolbarItem);
  }
}
