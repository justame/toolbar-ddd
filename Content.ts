import { IContentSpec } from './types';
export class Content {
  constructor(private content, private specs: IContentSpec[]) {}

  getValidSpecs() {
    return this.specs.filter((spec) => {
      return spec.test(this.content);
    });
  }
}
