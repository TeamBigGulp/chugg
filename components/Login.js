import React, {Component} from 'react';
import {Tabs} from 'react-bootstrap';
import {Tab} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';

export default class Login extends Component {
	render() {

		return (
			<div id='login-box' className="static-modal">
      <Modal show={this.props.showLogin} onHide={this.props.closeLogin.bind(this)}>
        <Modal.Body>
          <Tabs defaultActiveKey={1}>
            <Tab eventKey={1} title='Register'>
              <form className="create-account">
                   <Input type="text" placeholder="Username" onChange={this.props.username}></Input>
                   <Input type="password" placeholder="Password" onChange={this.props.password}></Input>
                   <Button bsStyle="success" onClick={this.props.saveUser}>Create Account</Button>&nbsp;
                   <Button bsStyle="danger" onClick={this.props.closeLogin.bind(this)}>Cancel</Button>
              </form>
              <br style={{clear: 'both' }} />
            </Tab>

            <Tab eventKey={2} title='Log in'>
              <form className="login">
                  <Input type="text" placeholder="Username" onChange={this.props.username}></Input>
                  <Input type="password" placeholder="Password" onChange={this.props.password}></Input>
                  <Button bsStyle="success" onClick={this.props.login}>Log in</Button>&nbsp;
                  <Button bsStyle="danger" onClick={this.props.closeLogin.bind(this)}>Cancel</Button>
              </form>
              <br style={{clear: 'both' }} />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
		);
	}
}
