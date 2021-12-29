import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import Toolbar from './Toolbar';
import content from './content.json';

interface AppProps {}
interface AppState {
  name: string;
  selectedNodeIndex: number;
}

class ToolbarButton implements IToolbarButtonConfig {
  id: string;
  button: Button;
  visiblityRules: VisibiltyRule[];
  disabledRules: DisabledRule[];
  constructor(id, button, visiblityRules) {}
}

const buttons: ToolbarButton[] = [
  {
    id: 'bold',
    button: { label: 'bold' },
    visiblityRules: [
      {
        test: (content) => {
          return content.type === 'PARAGRAPH';
        },
      },
    ],
    disabledRules: [],
  },
  {
    id: 'italic',
    button: { label: 'italic' },
    visiblityRules: [
      {
        test: (content) => {
          return content.type === 'PARAGRAPH';
        },
      },
    ],
    disabledRules: [
      {
        test: (content) => {
          return content.type === 'PARAGRAPH';
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
    };
  }

  renderNodeContent() {
    return JSON.stringify(content.nodes[this.state.selectedNodeIndex]);
  }

  render() {
    const selectedContent = content.nodes[this.state.selectedNodeIndex];
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
        <div>{this.renderNodeContent()}</div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
