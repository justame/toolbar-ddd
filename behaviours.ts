import { IButtonBehaviour, ISpec } from './types';
import { containsText } from './features';

export const visible: IButtonBehaviour = {
  name: 'visible',
  features: [containsText],
};

export const disabled: IButtonBehaviour = {
  name: 'disabled',
  features: [containsText, containtsWordYaron],
};
