import React, {Component} from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

export default class Gulpoptions extends Component{
	render() {
		return (
			<div id='Gulpoptions' className="col-md-5">

        <div className="centered">
          <h2 className="brand blueheader centered">Build Your Gulpfile</h2>
          <h3 className="centered aquaheader display">
            Need a gulpfile<br />
            for your next React, Angular,<br />
            or Node project?<br />
            We'll walk you through it.
          </h3>
          <Button bsStyle="success" className="centered">Get Started</Button>
        </div>

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
