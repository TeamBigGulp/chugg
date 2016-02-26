
import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import Gulpview from './Gulpview';
import Packagejson from './Packagejson';
import Download from './Download';
import Login from './Login';
import Gulpoptions from './Gulpoptions';
import constants from './constants/default';
import {Tabs} from 'react-bootstrap';
import {Tab} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
const defaultJson = constants.getDefaultJson();
const defaultGulp = constants.getDefaultGulp();

// React in ES6
// http://www.jackcallister.com/2015/08/30/the-react-quick-start-guide-es6-edition.html
export default class App extends Component {
	// 'use strict';

	constructor(props) {
		super(props);
		 this.state = {
			 code: defaultGulp.basic.start + defaultGulp.basic.tasks,
			 json: defaultJson.basic.start + defaultJson.basic.end,
			 currentJsonFramework: defaultJson.basic,
			 currentGulpFramework: defaultGulp.basic,
			 jsonDependencies: '',
			 gulpPlugins: '',
			 npmSearch: null,
			 npmPackage: [],
			 npmDescription: [],
			 paths: {
				 css: 'css/',
				 js: 'js/',
				 build: './build/',
				 app: 'App.js',
				 server: 'server/server.js'
			 },
			 username: '',
			 password: '',
			 projectName: '',
			 loggedIn: false,
			 showLogin: false,
			 loginErrorMessages: '',
			 registerErrorMessages: '',
			 accordionIsOpen: {
				 paths: false,
				 frameworks: true,
				 commontasks: false,
				 poweroptions: false
			 }
		 };
		 this.search = this.search.bind(this);
		 this.addToPackageJson = this.addToPackageJson.bind(this);
		 this.addToGulpfile = this.addToGulpfile.bind(this);
		 this.save = this.save.bind(this);
		 this.saveUser = this.saveUser.bind(this);
		 this.login = this.login.bind(this);
		 this.getUsername = this.getUsername.bind(this);
		 this.getPassword = this.getPassword.bind(this);
		 this.saveProjectName = this.saveProjectName.bind(this);
		 this.closeLogin = this.closeLogin.bind(this);
		 this.openLogin = this.openLogin.bind(this);
		 this.setEditorDefaults = this.setEditorDefaults.bind(this);
		 this.selectFramework = this.selectFramework.bind(this);
		 this.gulpUpdate = this.gulpUpdate.bind(this);
	 }

	// * Updates state every time something changes in the sandbox
	updateCode(newCode) {
		this.setState({ code: newCode });
	}

	// * Posts new json content to json file
	updateJson(newJson) {
		this.setState({ json: newJson });
		$.ajax({
			type: 'POST',
			url: '/json',
			data: newJson,
			contentType: 'text/plain; charset=utf-8',
		});
	}

	// * Hitting download button sends new gulpfile content to gulpfile and zips all three files to download for client
	download(event) {
		event.preventDefault();

		const gulpState = this.state.code;
		$.ajax({
			type: 'POST',
			url: '/gulp',
			data: gulpState,
			contentType: 'text/plain; charset=utf-8',
			success() {
				window.location.href = '/download';
			}

		});
	}

	 // * Search NPM packages
	 search(event) {
		 event.preventDefault();
		 const searchValue = event.target.value;

		 // * Get request to NPM search for the package name from user input
		$.get(`http://npmsearch.com/query?fields=name,keywords,rating,description,version&q=name:${event.target.value}&sort=rating:desc`, (data) => {

			data = JSON.parse(data).results;

			const pkgName = this.state.npmPackage;
			const pkgDesc = this.state.npmDescription;

			data.forEach((pkg) => {
				// This check makes sure no duplicate elements are pushed to the state array
				if (pkgName.findIndex((el) => {return el === pkg.name[0]}) === -1){
					pkgName.push(pkg.name[0]);
					pkgDesc.push(pkg.description[0]);
				}
			});

			this.setState({npmSearch: searchValue, npmPackage: pkgName, npmDescription: pkgDesc});
		});
	}


	// * Adds new package to json editor in dependencies
	 addToPackageJson (event) {
		 let pkgVersion;

		 // * Gets the package version of the current search
		 $.get(`http://npmsearch.com/query?fields=name,keywords,rating,description,version&q=name:${this.state.npmSearch}`, (data) => {
			 data = JSON.parse(data).results;
			 pkgVersion = data[0].version[0];
		 }).done(() => {
			 let newPackages = this.state.jsonDependencies;
			 let selectedFramework = this.state.currentJsonFramework;

			 newPackages += `,\n\t\t\t\t"${this.state.npmSearch}": "^${pkgVersion}"`;
			 this.setState({json: selectedFramework.start + newPackages + selectedFramework.end, jsonDependencies: newPackages});
		 })

	 }

	 // * Adds new plugins to gulp editor
	 addToGulpfile (event) {

		 let gulpSearch = this.state.npmSearch;
		 let plugins = this.state.gulpPlugins;
		 let selectedFramework = this.state.currentGulpFramework;

		 plugins += `\nvar ${gulpSearch.replace('gulp-', '')} = require('${gulpSearch}');`;

		 this.setState({
			 code: selectedFramework.start + plugins + selectedFramework.tasks,
			 gulpPlugins: plugins
		 });
	 }

	 // * Dynamically creates autocomplete search results based on user input
	 createSearchResults(nameArr, descArr) {
		 let resultsArr = [];
		 let counter = 0;
		 nameArr.forEach((name) => {
			 resultsArr.push(<option value={name} key={counter}>{descArr[counter]}</option>);
			 counter++;
		 })
		return resultsArr;
	 }

	 // * Saves the following to database: current package.json, current gulpfile, project name
	 save(event) {
		 event.preventDefault();
		 var database = {
			 projectName: this.state.projectName,
			 gulpFile: this.state.code,
			 packageJSON: this.state.json
		 }
		 database = JSON.stringify(database);

		 $.ajax({
			 type: 'POST',
			 url: '/save',
			 data: database,
			 contentType: 'application/json'
		 });
	 }

	 // * Creates an account in the database for the user
	 saveUser(event) {
		 event.preventDefault();

		 var that = this; // Isaac: I'm grabbing this (the App) so that I can run this.setState in the Ajax request. (Otherwise, 'this' inside $.ajax would be the ajax request.)
		 var data = {};
		 data.username = this.state.username;
		 data.password = this.state.password;
		 data = JSON.stringify(data);

		$.ajax({
			type: 'POST',
			url: '/register',
			data: data, // Whatever is in data will become req.body.
			contentType: 'application/json'
		})
		.done(function () {
			that.setState({
				loggedIn: true,
				registerErrorMessages: `Registration successful. You are now logged in as ${that.state.username}.`,
				password: ''
				// Isaac: I'd like to clear the username field, but we need to hang on to that information.
			});
		})
		.fail(function () {
			that.setState({
				loggedIn: false,
				registerErrorMessages: 'Registration failed.',
				username: '',
				password: ''
			});
		});
	 }

	 // * If it exists, returns the user's account
	 login(event) {
		 event.preventDefault();

		 var that = this;
		 var data = {};
		 data.username = this.state.username;
		 data.password = this.state.password;
		 data = JSON.stringify(data);

		$.ajax({
			type: 'POST',
			url: '/login',
			data: data,
			contentType: 'application/json'
		})
		.done(function () {
			that.setState({
				loggedIn: true,
				loginErrorMessages: `You are now logged in as ${that.state.username}.`,
				password: ''
			});
		})
		.fail(function () {
			that.setState({
				loggedIn: false,
				loginErrorMessages: 'Login failed.',
				username: '',
				password: ''
			});
		});
	}

	 // * Grabs the username from input
	 getUsername(event) {
		 this.setState({username: event.target.value});
	 }

	 // * Grabs the password from input
	 getPassword(event) {
		 this.setState({password: event.target.value});
	 }

	 // * Sets the project name
	 saveProjectName(event) {
		 event.preventDefault();
		 this.setState({projectName: event.target.value});
	 }

	 accordionSection(event) {
		 event.preventDefault();

		 let toAccordion = event.target.value;

		 // Do a little dance to set State only Once
		 let accordionObj = this.state.accordionIsOpen

		 // First close all sections
		 for (let section in accordionObj) {
			if (section === toAccordion) accordionObj[section] = true;
			else accordionObj[section] = false;
		}

		this.setState({ accordionIsOpen : accordionObj });
	 }

	 // * Uses button's dispatchMarker to determine the framework that was clicked on and uses helper func setEditorDefaults to update state. Note: Can't pass down setEditorDefaults directly - results in calling this.setState in infinite loop.

	 selectFramework(event) {
		 switch (event.dispatchMarker.replace(/[^a-z]/g, '')) {
			 case 'basic':
					this.setEditorDefaults(defaultGulp.basic, defaultJson.basic);
					break;
			 case 'react':
					 this.setEditorDefaults(defaultGulp.react, defaultJson.react);
					 break;
			 case 'angular':
					 this.setEditorDefaults(defaultGulp.angular, defaultJson.angular);
					 break;
			 case 'bootstrap':
					 this.setEditorDefaults(defaultGulp.bootstrap, defaultJson.bootstrap);
					 break;
		 }
	 }

	 setEditorDefaults(gulp, json) {
		 this.setState({
			 code: gulp.start + gulp.tasks,
			 json: json.start + json.end,
			 currentGulpFramework: gulp,
			 currentJsonFramework: json
		 });

		 if (this.state.currentGulpFramework !== gulp) {
			 this.setState({
				 jsonDependencies: '',
				 gulpPlugins: '',
			 })
		 }
	 }

	 // * Updates file structure
	 gulpUpdate(event) {
		 event.preventDefault();

		 let thePaths = this.state.paths;
		 let gulpFile = this.state.code;

		 let newOutput = event.target.value;
		 let theTarget = event.target.name;
		 let oldOutput = thePaths[theTarget];

		 oldOutput = oldOutput.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

		 let theMatch = new RegExp(oldOutput, 'g');

		 thePaths[theTarget] = newOutput;

		 gulpFile = gulpFile.replace(theMatch, newOutput);

		 let stateObj = {};
		 stateObj.paths = thePaths;
		 stateObj.code = gulpFile;

		 this.setState(stateObj);
	 }

	 openLogin(event) {
		 this.setState({ showLogin: true });
	 }

	 closeLogin(event) {
		 this.setState({ showLogin: false });
	 }

	render() {
		// console.log('this is new');
		let npmResults = this.createSearchResults(this.state.npmPackage, this.state.npmDescription);

		return (
			<div id='App'>

				<div className='row'>

					<div className="col-md-7">
						<Login
							loggedIn = {this.state.loggedIn}
							loginErrorMessages = {this.state.loginErrorMessages}
							registerErrorMessages = {this.state.registerErrorMessages}
							saveUser={this.saveUser}
							login={this.login}
							username={this.getUsername}
							password={this.getPassword}
							showLogin={this.state.showLogin}
							closeLogin={this.closeLogin.bind(this)}
						/>
					</div>
					<div className="col-md-1 centered">
						<Button onClick={() => this.setState({ showLogin : true })}>Log in</Button>
					</div>
					<div className="col-md-2 rightContainer">
						<Input type='text' onChange={this.saveProjectName} placeholder='Enter your project name'/>
					</div>
					<div className="col-sm-1 leftContainer">
						<Button onClick={this.save} bsStyle="success">Save</Button>
					</div>
					<div className="col-md-1 leftContainer">
						<Download
						download={this.download.bind(this)}
						/>
					</div>
				</div>

				<div className='row'>
					<Gulpoptions
						 paths={this.state.paths}
						 accordionSection={this.accordionSection.bind(this)}
						 accordionState={this.state.accordionIsOpen}
						 gulpBasic={this.selectFramework}
						 gulpReact={this.selectFramework}
						 gulpAngular={this.selectFramework}
						 gulpBootstrap={this.selectFramework}
						 gulpUpdate={this.gulpUpdate.bind(this)}
						/>


					<div className='col-md-7'>

						<Tabs defaultActiveKey={1}>
							<Tab eventKey={1} title='Gulpfile'>
								<form className="npm-search">
									<div className="col-md-10">
										<Input type="search" list="packages" placeholder="Search Gulp Plugins" onChange={this.search}></Input>
										<datalist id="packages">{npmResults}</datalist>
									</div>
									<div className="col-md-2">
										<Button onClick={this.addToGulpfile}>+ gulpfile.js</Button>
									</div>
									<br style={{clear: 'both' }} />
								</form>
								<Gulpview value={this.state.code} codeChange={this.updateCode.bind(this)} />
							</Tab>

							<Tab eventKey={2} title='package.json'>
								<form className="npm-search">
									<div className="col-md-10">
										<Input type="search" list="packages" placeholder="Search NPM Packages" onChange={this.search}></Input>
										<datalist id="packages">{npmResults}</datalist>
									</div>
									<div className="col-md-2">
										<Button onClick={this.addToPackageJson} className="right">+ package.json</Button>
									</div>
									<br style={{clear: 'both' }} />
								</form>
								<Packagejson value={this.state.json} jsonChange={this.updateJson.bind(this)} />
							</Tab>
						</Tabs>

					</div>
					</div>
			</div>

		)
	}
}

render(<App />, document.getElementById('main-container'));
