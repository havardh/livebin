import React from "react";
import "codemirror/mode/clike/clike";

import CodeMirror from "react-codemirror";

export default class CodeEditor extends React.Component {

  render() {
    const options = {
      mode: "text/x-java",
      lineNumbers: true,
    };
    return (
      <CodeMirror
        width="200px"
        height="200px"
        value={this.props.code}
        onChange={this.props.updateCode}
        options={options}
      />
    );
  }

}
