import React from 'react';
import { Tabs, Tab, Button, Input, Modal } from 'react-bootstrap';

const Login = (props) => (
  <div id="login-box" className="static-modal">
  <Modal show={props.showLogin} onHide={props.closeLogin}>
    <Modal.Body>
      <Tabs defaultActiveKey={1}>
        <Tab eventKey={1} title="Register">
          <form className="create-account">
               <Input type="text" placeholder="Username" onChange={props.username} />
               <Input type="password" placeholder="Password" onChange={props.password} />
               <Button bsStyle="success" onClick={props.saveUser}>Create Account</Button>&nbsp;
               <Button bsStyle="danger" onClick={props.closeLogin}>Cancel</Button>
          </form>
          <p>{props.registerErrorMessages}</p>
          <br style={{ clear: 'both' }} />
        </Tab>

        <Tab eventKey={2} title="Log in">
          <form className="login">
              <Input type="text" placeholder="Username" onChange={props.username} />
              <Input type="password" placeholder="Password" onChange={props.password} />
              <Button bsStyle="success" onClick={props.login}>Log in</Button>&nbsp;
              <Button bsStyle="danger" onClick={props.closeLogin}>Cancel</Button>
          </form>
          <p>{props.loginErrorMessages}</p>
          <br style={{ clear: 'both' }} />
        </Tab>
      </Tabs>
    </Modal.Body>
  </Modal>
</div>
);

Login.propTypes = {
  showLogin: React.PropTypes.bool,
  closeLogin: React.PropTypes.func,
  username: React.PropTypes.func,
  password: React.PropTypes.func,
  saveUser: React.PropTypes.func,
  registerErrorMessages: React.PropTypes.string,
  login: React.PropTypes.func,
  loginErrorMessages: React.PropTypes.string,
};

export default Login;
