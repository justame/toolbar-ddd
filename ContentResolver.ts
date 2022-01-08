export interface IContentResolver<T> {
  id: string;
  resolve: (content: T) => any;
  description: string;
  defaultValue: any;
}

export class ContentResolver implements IContentResolver<any> {
  private constructor(
    readonly id,
    readonly resolve,
    readonly defaultValue,
    readonly description
  ) {}
  static create({ resolve, defaultValue, description }) {
    return new ContentResolver(
      Math.random().toString(),
      resolve,
      defaultValue,
      description
    );
  }
}
