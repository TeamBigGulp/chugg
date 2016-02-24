import React, {Component} from 'react';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
// require('codemirror/theme/solarized.css');
import 'codemirror/mode/markdown/markdown';
//Dear next team, please do this. We wanted to show this in the view as well but did not get the time to add functionality.

export default class Packagejson extends Component {
  render() {
    var options = {
            lineNumbers: true,
            mode: 'application/json'
        };
    return (
      <div id='Packagejson'>
      Packages
      <Codemirror value={this.props.value} onChange={this.props.jsonChange.bind(this)} options={options} />

      </div>
    );
  }
}
