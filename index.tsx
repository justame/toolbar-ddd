import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import ToolbarComponent from './components/Toolbar';
import { Tiptap } from './TiptapEditor';
import {
  staticToolbarConfig,
  floatingToolbarConfig,
} from './toolbarItemConfig';
import { Content } from './Content';
import { RicosToolbar } from './Toolbar';
import { ToolbarItem } from './ToolbarItem';

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
  staticToolbar: RicosToolbar = null;
  floatingToolbar: RicosToolbar = null;
  content: Content;
  editor: any;

  constructor(props) {
    super(props);
    this.content = Content.create(null);

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

  onEditorLoad(editor) {
    this.staticToolbar = RicosToolbar.create({
      toolbarItemCreators: staticToolbarConfig.map((config) =>
        ToolbarItem.create(config)
      ),
      content: this.content,
      editor: editor,
    });

    this.floatingToolbar = RicosToolbar.create({
      toolbarItemCreators: floatingToolbarConfig.map((config) =>
        ToolbarItem.create(config)
      ),
      content: this.content,
      editor: editor,
    });

    console.log('this.toolbar ', this.editor);
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div>
          Static Toolbar
          {this.staticToolbar && (
            <ToolbarComponent toolbar={this.staticToolbar} />
          )}
        </div>
        <div>
          Floating Toolbar
          {this.floatingToolbar && (
            <ToolbarComponent toolbar={this.floatingToolbar} />
          )}
        </div>
        {/* <div style={{ height: 100, overflow: 'auto' }}>
          {this.renderNodeContent()}
        </div> */}
        <Tiptap
          onLoad={(editor) => this.onEditorLoad(editor)}
          onSelectionChange={(nodes) => {
            this.setSelection(nodes);
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
