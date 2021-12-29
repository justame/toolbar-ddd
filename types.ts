export class ToolbarButtonsVisibiltyManager {}

export type VisibiltyRule = {
  test: (content: any) => boolean;
};

export type DisabledRule = {
  test: (content: any) => boolean;
};

export interface ButtonsAggregator {
  getRelevantButtons: (content) => IToolbarButton[];
}

export interface IToolbarButtonConfig {
  button: IButton;
  visiblityRules: VisibiltyRule[];
  disabledRules: DisabledRule[];
}

export interface IButtonState {
  readonly disabled: boolean;
  readonly visible: boolean;
}

export interface IButton {
  label: string;
  icon?: string;
}

export type IToolbarButton = IButton & IButtonState;
