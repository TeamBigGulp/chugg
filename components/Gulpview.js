import React from 'react';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';

const Gulpview = (props) => {
  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'mbo',
    tabSize: 2,
  };
  return (
    <div id="Gulpview">
      <Codemirror value={props.value} onChange={props.codeChange} options={options} />
    </div>
  );
};

Gulpview.propTypes = {
  value: React.PropTypes.string,
  codeChange: React.PropTypes.func,
};

export default Gulpview;
