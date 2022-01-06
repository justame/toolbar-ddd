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
} from './types';
import { Content } from './Content';
import {
  configToToolbarItem,
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

// const buttons: IToggleButtonCreator[] = [
//   ToggleButton.create({
//     button: {
//       label: 'bold',
//       onClick: (label) => {
//         console.log(`button ${label} was clicked`);
//       },
//     },
//     visiblityRules: [
//       {
//         test: (content: any) => {
//           if (Array.isArray(content)) {
//             return content.map((c) => c?.textContent).indexOf('bold') !== -1;
//           }
//           return false;
//         },
//       },
//     ],
//     disabledRules: [],
//     activeRules: [],
//   }),
//   ToggleButton.create({
//     button: {
//       label: 'italic',
//       onClick: (label) => {
//         console.log(`button ${label} was clicked`);
//       },
//     },
//     visiblityRules: [
//       {
//         test: (content: any) => {
//           if (Array.isArray(content)) {
//             return content.map((c) => c?.textContent).indexOf('italic') !== -1;
//           }
//           return false;
//         },
//       },
//     ],
//     disabledRules: [],
//     activeRules: [],
//   }),
// ];

// const boldButton = new ToggleButton(
//   'bold',
//   {
//     tooltip: 'bold',
//   },
//   [visible]
// );

const buttons = [];

class App extends Component<AppProps, AppState> {
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
    // const specs = new Content(nodes, [containtsTheWordYaron]).getValidSpecs();
    this.setState({ selectedContent: nodes });
  };

  render() {
    const selectedContent = this.state.selectedContent || {};
    const toolbarItemsAndUpdators = configs.map((config) => {
      return configToToolbarItem(config);
    });

    const toolbar = ToolbarManager.create(
      toolbarItemsAndUpdators.map((item) => item.toolbarButton)
    );

    toolbarItemsAndUpdators.forEach(({ updateAttributesByContent }) => {
      updateAttributesByContent(this.state.selectedContent);
    });

    console.log({ toolbar, toolbarItemsAndUpdators });

    return (
      <div>
        {/* <Toolbar buttons={buttons} specs={this.state.specs} /> */}
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
