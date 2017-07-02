import React from "react";
import ReactDOM from "react-dom";

import store from "./store";
import {onChange, poll} from "./actions";

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {code: ""};
  }

  componentWillMount() {
    store.subscribe(() => this.onStoreChange());
    poll();
  }

  onStoreChange() {
    const code = store.getText();
    this.setState({code});
  }

  onChange = (newCode) => {
    onChange(newCode);
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="java"
          theme="monokai"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          value={this.state.code}
          editorProps={{$blockScrolling: true}}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('app')
);
