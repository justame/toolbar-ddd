import { IContentSpec } from './types';

export const containsText: IContentSpec = {
  name: 'containsText',
  test: (content) => {
    if (Array.isArray(content)) {
      return content.map((c) => c?.textContent).indexOf('text') !== -1;
    }
  },
};
