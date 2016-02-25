import React, {Component} from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Well} from 'react-bootstrap';

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
        </div>

        <div>
          <Button bsStyle="success">Add Frameworks</Button>

          <h3 className="centered blueheader display">Use These Common Frameworks?</h3>

          <Well className="optsWell" bsSize="large">
            <Button bsStyle="info" bsSize="large" block>React</Button>

            <Button bsStyle="info" bsSize="large" block>Angular</Button>

            <Button bsStyle="info" bsSize="large" block>Bootstrap</Button>

            <Button bsStyle="info" bsSize="large" block>jQuery</Button>
          </Well>

        </div>

        <div>
          <Button bsStyle="success">Carry Out Common Tasks</Button>

          <h3 className="centered blueheader display">Process Your Code:</h3>

          <Well className="optsWell" bsSize="large">
            <Button bsStyle="info" bsSize="large" block>Minify CSS</Button>

            <Button bsStyle="info" bsSize="large" block>Minify javascript</Button>

            <Button bsStyle="info" bsSize="large" block>Lint with JSHint</Button>

            <Button bsStyle="info" bsSize="large" block>Convert CoffeeScript</Button>

            <Button bsStyle="info" bsSize="large" block>Convert ES6 to ES5</Button>
          </Well>

        </div>

        <div>
          <Button bsStyle="success">Power User Options</Button>

          <h3 className="centered blueheader display">Try These Tools?</h3>

          <Well className="optsWell" bsSize="large">
            <Button bsStyle="info" bsSize="large" block>Google Closure Compiler</Button>

            <Button bsStyle="info" bsSize="large" block>Use BrowserSync</Button>
          </Well>

        </div>
			</div>
		);
	}
}
