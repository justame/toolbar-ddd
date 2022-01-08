import { ContentResolver } from './ContentResolver';

export const isContainsTextResolver = ContentResolver.create({
  resolve: (content) => {
    return (
      Array.isArray(content) &&
      content.map((c) => c?.textContent).indexOf('bold') !== -1
    );
  },
  description: 'is contains text',
  defaultValue: false,
});

export const textColorResolver = ContentResolver.create({
  resolve: (content) => {
    return 'blue';
  },
  description: 'text color',
  defaultValue: 'blue',
});
