import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import Toolbar from './Toolbar';
// import content from './content.json';
import { Tiptap } from './TiptapEditor';
import {
  IToolbarButtonConfig,
  IVisibiltyRule,
  IDisabledRule,
  IRicosContent,
  IDraftContent,
  IToggleButtonConfig,
  IToggleButton,
  IToggleButtonCreator,
  ButtonBehaviour,
  ISpec,
  IContentSpec,
  IToolbarItem,
} from './types';
import { Content } from './Content';
import {
  createToolbarItemByConfig,
  configs,
  Toolbar as ToolbarManager,
} from './buttonsConfigs';
import { ToggleButton } from './ToggleButton';
import { containsText } from './features';
interface AppProps {}
interface AppState {
  name: string;
  selectedNodeIndex: number;
  selectedContent: any;
  specs: IContentSpec[];
}

const buttons = [];

class App extends Component<AppProps, AppState> {
  toolbarItemIdAttributesMap = {};
  toolbarItems = [];
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      selectedNodeIndex: 1,
      selectedContent: null,
      specs: [],
    };
  }

  renderNodeContent() {
    return JSON.stringify(this.state.selectedContent);
  }

  setSelection = (nodes) => {
    console.log('setSelection', nodes);
    this.setState({ selectedContent: nodes });
    this.toolbarItems.forEach((toolbarItem) => {
      const attributes = this.toolbarItemIdAttributesMap[toolbarItem.id];
      Object.keys(attributes).forEach((attributeName) => {
        const resolvedValue = attributes[attributeName].resolve(nodes);
        toolbarItem.setAttribute(attributeName, resolvedValue);
      });
    });
  };

  componentWillMount() {
    const toolbarItemIdAttributesMap = {};
    const toolbarItems = [];
    configs.forEach((config) => {
      const toolbarItem = createToolbarItemByConfig(config);
      const attributes = config.attributes;
      toolbarItemIdAttributesMap[toolbarItem.id] = attributes;
      toolbarItems.push(toolbarItem);
    });

    this.toolbarItemIdAttributesMap = toolbarItemIdAttributesMap;
    this.toolbarItems = toolbarItems;
  }

  render() {
    return (
      <div>
        <Toolbar buttons={this.toolbarItems} />
        <div>
          <button
            onClick={() =>
              this.setState({
                selectedNodeIndex: this.state.selectedNodeIndex + 1,
              })
            }
          >
            next node
          </button>
        </div>
        <div style={{ height: 100, overflow: 'auto' }}>
          {this.renderNodeContent()}
        </div>
        <Tiptap
          onSelectionChange={(nodes) => {
            this.setSelection(nodes);
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
