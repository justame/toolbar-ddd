import { IToolbarItem } from './types';

export class ToolbarItem implements IToolbarItem {
  attributes = {};
  label = '';
  private constructor(readonly id, label: string) {
    this.label = label;
  }

  setAttribute(key, value) {
    this.attributes[key] = value;
  }
  getAttribute(key) {
    return this.attributes[key];
  }
  static create(id, label) {
    return new ToolbarItem(id, label);
  }
}
