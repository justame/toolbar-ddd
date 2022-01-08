import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import ToolbarComponent from './components/Toolbar';
import { Tiptap } from './TiptapEditor';

import { createToolbarItemByConfig, configs } from './buttonsConfigs';
import { Content } from './Content';
import { Toolbar } from './Toolbar';

interface AppProps {}
interface AppState {
  selectedContent: any;
}

class App extends Component<AppProps, AppState> {
  toolbar: Toolbar = null;
  toolbarItemUpdators = [];

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
    const content = Content.create(nodes);
    this.toolbarItemUpdators.forEach((updateAttribute) => {
      updateAttribute(content);
    });

    this.setState({ selectedContent: nodes });
  };

  componentWillMount() {
    this.toolbar = Toolbar.create();

    configs.forEach((config) => {
      const { toolbarItem, updateAttributes } =
        createToolbarItemByConfig(config);

      this.toolbarItemUpdators.push(updateAttributes);
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
