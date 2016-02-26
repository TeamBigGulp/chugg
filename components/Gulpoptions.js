
import React, {Component} from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Well} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import {Collapse} from 'react-bootstrap';


export default class Gulpoptions extends Component{
	render() {
		return (
			<div id='Gulpoptions' className="col-md-5">

				<div className="centered">
					<h2 className="brand redcallout centered">Build Your Gulpfile</h2>
					<h3 className="centered blueheader display">
						Need a gulpfile<br />
						for your next project?<br />
						We will walk you through it.
					</h3>
				</div>
				<div>
					<div className="headerbutton centered">
						<Button bsSize="large"
						onClick={this.props.accordionSection.bind(this)}
						value="frameworks">Select a framework</Button>
					</div>
					<Collapse in={this.props.accordionState.frameworks}>
						<div className="pad2 dottedblue">
						<Button bsStyle="info" bsSize="large" block onClick={this.props.gulpBasic}>Basic HTML/CSS/JS</Button>
						<h3 className="centered blueheader display"></h3>
						<Well className="optsWell" bsSize="large">
							<Button bsStyle="info" bsSize="large" block onClick={this.props.gulpReact}>React</Button>
							<Button bsStyle="info" bsSize="large" block onClick={this.props.gulpAngular}>Angular</Button>
							<Button bsStyle="info" bsSize="large" block onClick={this.props.gulpBootstrap}>Bootstrap</Button>
						</Well>
						</div>
					</Collapse>
				</div>

				<div>
					<div className="headerbutton centered">
						<Button value="paths" bsSize="large" onClick={this.props.accordionSection.bind(this)} >Customize Your File Structure</Button>
					</div>
					<Collapse in={this.props.accordionState.paths}>
						<div className="pad2 dottedblue">
							<h3 className="centered blueheader display">Where Are Your Files Located?</h3>
							<Well className="optsWell" bsSize="large">
								<Input type="text" label="Path to CSS" placeholder="styles/" defaultValue={this.props.paths.css} />
								<Input type="text" label="Path to Javascript" placeholder="js/" defaultValue={this.props.paths.js} />
								<Input type="text" label="Output File Location" placeholder="./build/" defaultValue={this.props.paths.build} />
								<div className="rightContainer">
									<Button bsStyle="info">Apply</Button>
								</div>
							</Well>
						</div>
					</Collapse>
				</div>
				<div>
					<div className="headerbutton centered">
						<Button bsSize="large" onClick={this.props.accordionSection.bind(this)} value="commontasks">Carry Out Common Tasks</Button>
					</div>
					<Collapse in={this.props.accordionState.commontasks}>
						<div className="pad2 dottedblue">
							<h3 className="centered blueheader display">Process Your Code:</h3>
							<Well className="optsWell" bsSize="large">
								<Button bsStyle="info" bsSize="large" block>Minify CSS</Button>
								<Button bsStyle="info" bsSize="large" block>Minify javascript</Button>
								<Button bsStyle="info" bsSize="large" block>Lint with JSHint</Button>
								<Button bsStyle="info" bsSize="large" block>Convert CoffeeScript</Button>
								<Button bsStyle="info" bsSize="large" block>Convert ES6 to ES5</Button>
							</Well>
						</div>
					</Collapse>
				</div>
				<div>
					<div className="headerbutton centered">
						<Button bsSize="large" onClick={this.props.accordionSection.bind(this)} value="poweroptions">Power User Options</Button>
					</div>
					<Collapse in={this.props.accordionState.poweroptions}>
						<div className="pad2 dottedblue">
							<h3 className="centered blueheader display">Try These Tools?</h3>
							<Well className="optsWell" bsSize="large">
								<Button bsStyle="info" bsSize="large" block>Google Closure Compiler</Button>
								<Button bsStyle="info" bsSize="large" block>Use BrowserSync</Button>
							</Well>
						</div>
					</Collapse>
				</div>
			</div>
		);
	}
}
