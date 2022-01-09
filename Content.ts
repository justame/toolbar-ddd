import { ContentResolver } from './ContentResolver';
import EventEmitter from './EventEmitter';

export class Content extends EventEmitter {
  private constructor(private content) {
    super();
  }
  private resolved = {};
  resolve(contentResolver: ContentResolver) {
    if (this.resolved[contentResolver.id]) {
      return this.resolved[contentResolver.id];
    } else {
      this.resolved[contentResolver.id] = contentResolver.resolve(this.content);
    }
    return this.resolved[contentResolver.id];
  }

  updateContent(content) {
    this.content = content;
    this.resolved = {};
  }

  isEmpty() {
    return !!this.content;
  }

  static create(content) {
    return new Content(content);
  }
}
