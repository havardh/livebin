import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import generate from 'project-name-generator';

import {diffChars} from "diff";

import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import sharedb from "sharedb/lib/client";
import {type} from "ot-text";
sharedb.types.register(type);

import './styles.css';
import './codemirror.css';

function generateOperations(oldCode, newCode) {
  const operations = diffChars(oldCode, newCode);

  return operations.map(op => {
    if (op.added) {
      return op.value;
    } else if (op.removed) {
      return {d: op.value.length};
    } else {
      return op.value.length;
    }
  });
}

class App extends React.Component {

  constructor(props) {
    super(props);

    const {user, file} = props.match.params;

    const socket = new WebSocket('ws://' + window.location.host);
    const connection = new sharedb.Connection(socket);
    
    const doc = connection.get(
      props.match.params.user || "*",
      file
    );

    doc.subscribe(() => {
      if (!doc.type) {
        doc.create("", "text");
      }

      doc.on('op', (op, source) => {
        if (!source) {
          this.setState({ code: doc.data });
        }
      });
    });

    this.state = {
      code: "Loading ...",
      doc,
      mode: "java"
    };
  }

  componentDidMount() {
    this.state.doc.subscribe(() => {
      this.setState({ code: this.state.doc.data });
    })
  }

  onChange = (newCode) => {
    const ops = generateOperations(this.state.doc.data, newCode);
    this.state.doc.submitOp(ops, {}, () => {
      this.setState({ code: this.state.doc.data });
    });
  }

  setMode = ({target}) => {
    const {value} = target;
    this.setState({mode: value});
  }

  render() {
    return (
      <div>
        <select value={this.state.mode} onChange={this.setMode}>
          <option value="java">Java</option>
          <option value="javascript">Javascript</option>
        </select>

        <AceEditor
          mode={this.state.mode}
          theme="monokai"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          value={this.state.code}
          editorProps={{$blockScrolling: true}}
          height="100%"
          width="100%"
        />
      </div>
    );
  }
}

class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = { file: generate().dashed };
  }

  render() {
    return (
      <div>
        <h1> Ace + ShareDB = livebin.xyz </h1>
        <p>An Open Source collabrative editor that you can host yourself.</p>

        <div>
          <h2>Get hacking</h2>
          <div>
            {document.location.host}/
            <input value={this.state.file} onChange={event => this.setState({file: event.target.value})} />&nbsp;
            <Link to={this.state.file}>Go!</Link>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Router>
      <div>
        <Route exact path="/" component={Landing} />
        <Route path="/:user/:file" component={App} />
        <Route path="/:file" component={App} />
      </div>
    </Router>
  </div>,
  document.getElementById('app')
);
