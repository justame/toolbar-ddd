export class ToolbarButtonsVisibiltyManager {}

export interface IVisibiltyRule<T> {
  test: (content: T) => boolean;
}

export type IDisabledRule<T> = {
  test: (content: any) => boolean;
};

export interface ButtonsAggregator<T> {
  getRelevantButtons: (content: T) => IToolbarButton[];
}

export interface IEditorContent {}
export interface IRicosContent extends IEditorContent {
  type: string;
  nodes: [];
}

export interface IDraftContent extends IEditorContent {
  blocks: []]

}

export interface IToolbarButtonConfig<T> {
  button: IButton;
  visiblityRules: IVisibiltyRule<T>[];
  disabledRules: IDisabledRule<T>[];
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
