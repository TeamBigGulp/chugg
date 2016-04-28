
import React from 'react';
import { Button, Well, Input, Collapse } from 'react-bootstrap';

const Gulpoptions = (props) => (
  <div id="Gulpoptions" className="col-md-5">

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
        <Button bsSize="large" onClick={props.accordionSection} value="frameworks">
          Select a framework
        </Button>
      </div>
      <Collapse in={props.accordionState.frameworks}>
        <div className="pad2 dottedblue">
        <Button bsStyle="info" bsSize="large" block key={'basic'} onClick={props.gulpBasic}>
          Basic HTML/CSS/JS
        </Button>
        <h3 className="centered blueheader display"></h3>
        <Well className="optsWell" bsSize="large">
          <Button bsStyle="info" bsSize="large" block key={'react'} onClick={props.gulpReact}>
            React
          </Button>
          <Button bsStyle="info" bsSize="large" block key={'angular'} onClick={props.gulpAngular}>
            Angular
          </Button>
          <Button bsStyle="info" bsSize="large" block key={'bootstrap'}
            onClick={props.gulpBootstrap}
          >
            Bootstrap
          </Button>
        </Well>
        </div>
      </Collapse>
    </div>

    <div>
      <div className="headerbutton centered">
        <Button value="paths" bsSize="large" onClick={props.accordionSection}>
          Customize Your File Structure
        </Button>
      </div>
      <Collapse in={props.accordionState.paths}>
        <div className="pad2 dottedblue">
          <h3 className="centered blueheader display">Where Are Your Files Located?</h3>
          <Well className="optsWell" bsSize="large">
            <Input type="text" label="Path to CSS" placeholder="styles/"
              defaultValue={props.paths.css}
            />
            <Input type="text" label="Path to Javascript" placeholder="js/"
              defaultValue={props.paths.js}
            />
            <Input type="text" label="Output File Location" placeholder="./build/"
              defaultValue={props.paths.build}
            />
            <div className="rightContainer">
              <Button bsStyle="info">Apply</Button>
            </div>
          </Well>
        </div>
      </Collapse>
    </div>
    <div>
      <div className="headerbutton centered">
        <Button bsSize="large" onClick={props.accordionSection} value="commontasks">
          Carry Out Common Tasks
        </Button>
      </div>
      <Collapse in={props.accordionState.commontasks}>
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
        <Button bsSize="large" onClick={props.accordionSection} value="poweroptions">
          Power User Options
        </Button>
      </div>
      <Collapse in={props.accordionState.poweroptions}>
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

Gulpoptions.propTypes = {
  accordionSection: React.PropTypes.func,
  accordionState: React.PropTypes.object,
  gulpBasic: React.PropTypes.func,
  gulpReact: React.PropTypes.func,
  gulpAngular: React.PropTypes.func,
  gulpBootstrap: React.PropTypes.func,
  paths: React.PropTypes.object,
};

export default Gulpoptions;
