import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import ToolbarComponent from './Toolbar';
// import content from './content.json';
import { Tiptap } from './TiptapEditor';
import { IContentSpec } from './types';

import {
  createToolbarItemByConfig,
  configs,
  Toolbar as ToolbarManager,
  Toolbar,
} from './buttonsConfigs';

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
  toolbar: Toolbar = null;

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
      toolbarItemIdAttributesMap[toolbarItem.id] = config.attributes;
      toolbarItems.push(toolbarItem);
    });

    this.toolbarItemIdAttributesMap = toolbarItemIdAttributesMap;
    this.toolbarItems = toolbarItems;

    this.toolbar = Toolbar.create(toolbarItems);
  }

  render() {
    return (
      <div>
        <ToolbarComponent toolbar={this.toolbar} />
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
