import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import ToolbarComponent from './Toolbar';
import { Tiptap } from './TiptapEditor';

import {
  createToolbarItemByConfig,
  configs,
  Toolbar as ToolbarManager,
  Toolbar,
  Content,
} from './buttonsConfigs';

interface AppProps {}
interface AppState {
  selectedContent: any;
}

class App extends Component<AppProps, AppState> {
  toolbarItemIdAttributesMap = {};
  toolbarItems = [];
  toolbar: Toolbar = null;
  updateAttributesList = [];

  constructor(props) {
    super(props);
    this.state = {
      selectedContent: null,
    };
  }

  renderNodeContent() {
    return JSON.stringify(this.state.selectedContent);
  }

  setSelection = (nodes) => {
    console.log('setSelection', nodes);
    this.setState({ selectedContent: nodes });
    const content = Content.create(nodes);
    this.updateAttributesList.forEach((updateAttribute) => {
      updateAttribute(content);
    });
  };

  componentWillMount() {
    this.toolbar = Toolbar.create();

    // const toolbarItemIdAttributesMap = {};
    // const toolbarItems = [];
    configs.forEach((config) => {
      const { toolbarItem, updateAttributes } =
        createToolbarItemByConfig(config);
      this.updateAttributesList.push(updateAttributes);
      this.toolbar.addToolbarItem(toolbarItem);
    });
  }

  render() {
    return (
      <div>
        <ToolbarComponent toolbar={this.toolbar} />
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
