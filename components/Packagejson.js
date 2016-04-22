import React from 'react';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

const Packagejson = (props) => {
  const options = {
    lineNumbers: true,
    mode: 'application/json',
    readonly: true,
    theme: 'mbo',
    tabSize: 2,
  };

  return (
    <div id="Packagejson">
      <Codemirror value={props.value} onChange={props.jsonChange} options={options} />
    </div>
  );
};

Packagejson.propTypes = {
  value: React.PropTypes.string,
  jsonChange: React.PropTypes.func,
};

export default Packagejson;
