import React, {Component} from 'react';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
// require('./../node_modules/codemirror/lib/codemirror.css');
//Dear next team, please do this. We wanted to show this in the view as well but did not get the time to add functionality.


export default class Packagejson extends Component {
  render() {
    var options = {
            lineNumbers: true,
            mode: 'application/json',
            readonly: true,
            theme: 'mbo'
        };
    return (
      <div id='Packagejson'>
      <Codemirror value={this.props.value} onChange={this.props.jsonChange.bind(this)} options={options} />
      </div>
    );
  }
}
