import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import ToolbarComponent from './components/Toolbar';
import { Tiptap } from './TiptapEditor';

import { configs } from './buttonsConfigs';
import { Content } from './Content';
import { Toolbar } from './Toolbar';

interface AppProps {}
interface AppState {
  selectedContent: any;
}

// implement flicks
// color indicator
// tooltip
// icon
class App extends Component<AppProps, AppState> {
  toolbar: Toolbar = null;
  toolbarItemUpdators = [];

  constructor(props) {
    super(props);
    this.toolbar = Toolbar.create(configs);
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
      updateAttribute(this.toolbar, content);
    });

    this.setState({ selectedContent: nodes });
  };

  componentWillMount() {}

  render() {
    return (
      <div>
        <ToolbarComponent
          configs={configs}
          content={this.state.selectedContent}
        />
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
