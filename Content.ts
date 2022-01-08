import { ContentResolver } from './ContentResolver';

export class Content {
  private constructor(private content) {}
  private resolved = {};
  resolve(contentResolver: ContentResolver) {
    if (this.resolved[contentResolver.id]) {
      return this.resolved[contentResolver.id];
    } else {
      this.resolved[contentResolver.id] = contentResolver.resolve(this.content);
    }
    return this.resolved[contentResolver.id];
  }
  static create(content) {
    return new Content(content);
  }
}
