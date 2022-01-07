export class ToolbarButtonsVisibiltyManager {}

export interface IVisibiltyRule<T> {
  test: (content: T) => boolean;
}

export type IDisabledRule<T> = {
  test: (content: any) => boolean;
};

export type IActiveRule<T> = {
  test: (content: any) => boolean;
};

export interface ButtonsAggregator<T> {
  getVisibleItems: () => IToolbarButton[];
}

export interface IEditorContent {}
export interface IRicosContent extends IEditorContent {}

export interface IDraftContent extends IEditorContent {
  blocks: [];
}

export interface IToolbarButtonConfig<T> {
  button: IButtonBase;
  visiblityRules: IVisibiltyRule<T>[];
  disabledRules: IDisabledRule<T>[];
}

export interface IButtonStateBase {
  readonly disabled: boolean;
  readonly visible: boolean;
}

export interface IButtonBase {
  label: string;
  icon?: string;
  onClick: (label) => void;
}

export type IToolbarButtonBase = IButtonBase & IButtonStateBase;

export interface IToggleButtonConfig<T> extends IToolbarButtonConfig<T> {
  activeRules: IActiveRule<T>[];
}

export type IToolbarButton = IToggleButton;

export type IToggleButtonCreator = (content) => IToggleButton;
export interface IToggleButton extends IToolbarButtonBase {
  readonly type: string;
  readonly active: boolean;
}

export interface ISpec {
  name: string;
}
export interface IContentSpec extends ISpec {
  test: (content) => boolean;
}

export interface IEditorSpec extends ISpec {
  test: (editor) => boolean;
}

export interface ButtonBehaviour {
  name: string;
  features: ISpec[];
}

export interface ContentResolver<T> {
  id: string;
  resolve: (content) => T;
  description: string;
  defaultValue: T;
}

export interface ToolbarItemConfig {
  id: string;
  type: string;
  attributes: Record<string, ContentResolver<number | string | boolean>>;
}

export interface IToolbarItem {
  id: string;
  attributes: ToolbarItemConfig['attributes'];
  setAttribute: (key, value) => void;
  getAttribute: (key) => any;
}
