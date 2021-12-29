import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import Toolbar from './Toolbar';
import content from './content.json';
import { Tiptap } from './TiptapEditor';
import {
  IToolbarButtonConfig,
  IVisibiltyRule,
  IDisabledRule,
  IRicosContent,
  IDraftContent,
} from './types';

interface AppProps {}
interface AppState {
  name: string;
  selectedNodeIndex: number;
  selectedContent: any;
}

const buttons: IToolbarButtonConfig<IRicosContent>[] = [
  {
    button: {
      label: 'bold',
      onClick: (label) => {
        console.log(`button ${label} was clicked`);
      },
    },
    visiblityRules: [
      {
        test: (content: any) => {
          if (Array.isArray(content)) {
            return content.map((c) => c?.textContent).indexOf('bold') !== -1;
          }
          return false;
        },
      },
    ],
    disabledRules: [],
  },
  {
    button: {
      label: 'italic',
      onClick: (label) => {
        console.log(`button ${label} was clicked`);
        // fire BI Event
        // BiServie.fireEvent(label)
      },
    },
    visiblityRules: [
      {
        test: (content) => {
          if (Array.isArray(content)) {
            return content.map((c) => c?.textContent).indexOf('italic') !== -1;
          }
          return false;
        },
      },
    ],
    disabledRules: [
      {
        test: (content) => {
          if (Array.isArray(content)) {
            return (
              content.map((c) => c?.textContent).indexOf('disabled') !== -1
            );
          }
          return false;
        },
      },
    ],
  },
];

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      selectedNodeIndex: 1,
      selectedContent: null,
    };
  }

  renderNodeContent() {
    return JSON.stringify(this.state.selectedContent);
  }

  setSelection = (nodes) => {
    this.setState({ selectedContent: nodes });
  };

  render() {
    const selectedContent = this.state.selectedContent || {};
    return (
      <div>
        <Toolbar buttons={buttons} content={selectedContent} />
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
