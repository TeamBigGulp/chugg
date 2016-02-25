import React, {Component} from 'react';
import {Tabs} from 'react-bootstrap';
import {Tab} from 'react-bootstrap';

export default class Login extends Component {
	render() {

		return (
			<div id='login-box'>

				<Tabs defaultActiveKey={1}>

				<Tab eventKey={1} title='Register'>
					<form className="create-account">
					<div className="col-md-10">
							 <input type="text" placeholder="Username" onChange={this.props.username}></input>
							 <input type="text" placeholder="Password" onChange={this.props.password}></input>
					</div>
				<div className="col-md-2">
						<button onClick={this.props.saveUser}>Create Account</button>
				</div>
				</form>
				<br style={{clear: 'both' }} />
				</Tab>

				<Tab eventKey={2} title='Log in'>
					<form className="login"/>
					<div className="col-md-10">
					<input type="text" placeholder="Username" onChange={this.props.username}></input>
					<input type="text" placeholder="Password" onChange={this.props.password}></input>
				</div>
				<div className="col-md-2">
						<button onClick={this.props.login}>Log in</button>
				</div>
				<br style={{clear: 'both' }} />
				</Tab>

				</Tabs>

			</div>
		);
	}
}
