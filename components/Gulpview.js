import React, {Component} from 'react';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';


export default class Gulpview extends Component {
	render() {
		var options = {
						lineNumbers: true,
						mode: 'javascript',
						theme: 'mbo',
						tabSize: 2
				};
		return (
			<div id='Gulpview'>
			<Codemirror value={this.props.value} onChange={this.props.codeChange.bind(this)} options={options} />
			</div>
		);
	}
}
