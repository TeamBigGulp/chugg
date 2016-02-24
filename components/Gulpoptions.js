import React, {Component} from 'react';

export default class Gulpoptions extends Component{
	render() {
		return (
			<div id='Gulpoptions'>
			<form onClick={this.props.addTask.bind(this)}>
			<input type="checkbox" className="minify" id="minify" name="minify" value="minify" />
			<span className="input-name">CSS Nano</span>
			&nbsp; | &nbsp;
			<input type="checkbox" className="closure" name="closure-compiler" value="closure-compiler" />
			<span className="input-name">Closure Complier</span>
			</form>
			</div>
		);
	}
}
