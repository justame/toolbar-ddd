import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import ToolbarComponent from './components/Toolbar';
import { Tiptap } from './TiptapEditor';
import { configs } from './toolbarItemConfig';
import { Content } from './Content';
import { RicosToolbar, ToolbarItem } from './Toolbar';

interface AppProps {}
interface AppState {
  selectedContent: any;
}

// implement flicks
// color indicator
// tooltip
// icon
// open modal
class App extends Component<AppProps, AppState> {
  toolbar: RicosToolbar = null;
  toolbarItemUpdators = [];
  content: Content;

  constructor(props) {
    super(props);
    this.content = Content.create(null);
    this.toolbar = RicosToolbar.create({
      toolbarItemCreators: configs.map((config) => ToolbarItem.create(config)),
      content: this.content,
    });

    this.state = {
      selectedContent: null,
    };
  }

  renderNodeContent() {
    return JSON.stringify(this.state.selectedContent);
  }

  setSelection = (nodes) => {
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
