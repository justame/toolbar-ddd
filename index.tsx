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
  content: any;

  constructor(props) {
    super(props);
    this.content = Content.create(null);
    this.toolbar = Toolbar.create(configs, Content.create(null));
    this.state = {
      selectedContent: null,
    };
  }

  renderNodeContent() {
    return JSON.stringify(this.state.selectedContent);
  }

  setSelection = (nodes) => {
    // this.toolbarItemUpdators.forEach((updateAttribute) => {
    //   updateAttribute(this.toolbar, content);
    // });
    this.content.updateContent(nodes);
    this.setState({ selectedContent: nodes });
  };

  componentWillMount() {}

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
