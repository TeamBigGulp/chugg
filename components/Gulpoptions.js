import React, {Component} from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

export default class Gulpoptions extends Component{
	render() {
		return (
			<div id='Gulpoptions' className="col-md-5">

        <div>
          <h2 className="brand">Build Your Gulpfile</h2>
          <p>
            Need a gulpfile for your next React, Angular, or Node project?
          </p>
          <p>
            We'll walk you through it.
          </p>
          <Button bsStyle="success">Get Started</Button>
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
