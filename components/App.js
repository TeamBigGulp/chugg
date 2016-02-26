
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
		 this.gulpBasic = this.gulpBasic.bind(this);
		 this.gulpReact = this.gulpReact.bind(this);
		 this.gulpAngular = this.gulpAngular.bind(this);
		 this.gulpBootstrap = this.gulpBootstrap.bind(this);
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

// Potentially getting rid of this block by next merge to master -Tiffany
// Adds or removes new task to code on chekbox click. Note, this can be done much better and more consisely. jQuery is not needed.
	newTasks() {
		// // jQuery will return either the value if checked, or undefined
		// let addonObj = {
		// 	minify : $('.minify:checked').val(),
		// 	closure : $('.closure:checked').val(),
		// };
		// console.log(addonObj);
		// // let requireCode = code.require;
		// // let gulpCode = code.gulp;
		// // let require;
		// // checks which values are true and displays them
		// for (var val in addonObj){
		// 	console.log(val);
		// 	if (addonObj[val]) {
		// 		var require = val + 'Require';
		// 		requireCode += code[require];
		// 		gulpCode += code[val];
		// 	}
		// }
		// let displayedCode = requireCode + gulpCode + code.gulpTask;
		// this.setState({code: displayedCode});
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
		 event.preventDefault();
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
		 event.preventDefault();

		 let gulpSearch = this.state.npmSearch;
		 let plugins = this.state.gulpPlugins;
		 let selectedFramework = this.state.currentGulpFramework;

		 plugins += `\nvar ${gulpSearch.replace('gulp-', '')} = require('${gulpSearch}');`;

		 this.setState({
			 code: selectedFramework.start + plugins + selectedFramework.tasks,
			 gulpPlugins: plugins
		 });

		//  let addonObj = {
		// 	 minify : $('.minify:checked').val(),
		// 	 closure : $('.closure:checked').val(),
		//  };
		//  console.log(addonObj);
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
		 console.log('Here is the current state of json code: ', this.state.json);
		 console.log('Here is the current state of gulp code: ', this.state.code);
			console.log('Here is the current state of project name: ', this.state.projectName);
			console.log('Here is the data type of gulp code: ', typeof this.state.code);
	 }

	 // * Creates an account in the database for the user
	 saveUser(event) {
		 event.preventDefault();

		 var that = this;
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
			console.log('Successful registration');
			that.setState({loggedIn: true});
		})
		.fail(function () {
			console.log('Registration failed');
		});
	 }

	 // * If it exists, returns the user's account
	 login(event) {
		 event.preventDefault();
		 console.log('You are logging in');

		 var that = this; // Isaac: I'm grabbing this (the App) so that I can run this.setState in the Ajax request. (Otherwise, 'this' inside $.ajax would be the ajax request.)
		 var data = {};
		 data.username = this.state.username;
		 data.password = this.state.password;
		 data = JSON.stringify(data);
		 console.log(data);

		$.ajax({
			type: 'POST',
			url: '/login',
			data: data,
			contentType: 'application/json'
		})
		.done(function () {
			that.setState({loggedIn: true});
			console.log('Successful login');
		})
		.fail(function () {
			console.log('Login failed');
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

	 // * The following four functions handle clicks on each framework button
	 gulpBasic() {
		 this.setState({
			 code: defaultGulp.basic.start + defaultGulp.basic.tasks,
			 json: defaultJson.basic.start + defaultJson.basic.end,
			 currentGulpFramework: defaultGulp.basic,
			 currentJsonFramework: defaultJson.basic
		 });
		 // * This clears out any dependencies/plugins that were added on a different framework
		 if (this.state.currentGulpFramework !== defaultGulp.basic) {
			 this.setState({
				 jsonDependencies: '',
				 gulpPlugins: '',
			 })
		 }
	 }

	 gulpReact() {
		 this.setState({
			 code: defaultGulp.react.start + defaultGulp.react.tasks,
			 json: defaultJson.react.start + defaultJson.react.end,
			 currentGulpFramework: defaultGulp.react,
			 currentJsonFramework: defaultJson.react
		 });
		 if (this.state.currentGulpFramework !== defaultGulp.react) {
			 this.setState({
				 jsonDependencies: '',
				 gulpPlugins: '',
			 })
		 }
	 }

	 gulpAngular() {
		 this.setState({
			 code: defaultGulp.angular.start + defaultGulp.angular.tasks,
			 json: defaultJson.angular.start + defaultJson.angular.end,
			 currentGulpFramework: defaultGulp.angular,
			 currentJsonFramework: defaultJson.angular
		 });
		 if (this.state.currentGulpFramework !== defaultGulp.angular) {
			 this.setState({
				 jsonDependencies: '',
				 gulpPlugins: '',
			 })
		 }
	 }

	 gulpBootstrap() {
		 this.setState({
			 code: defaultGulp.bootstrap.start + defaultGulp.bootstrap.tasks,
			 json: defaultJson.bootstrap.start + defaultJson.bootstrap.end,
			 currentGulpFramework: defaultGulp.bootstrap,
			 currentJsonFramework: defaultJson.bootstrap
		 });
		 if (this.state.currentGulpFramework !== defaultGulp.bootstrap) {
			 this.setState({
				 jsonDependencies: '',
				 gulpPlugins: '',
			 })
		 }
	 }

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

	render() {

		let npmResults = this.createSearchResults(this.state.npmPackage, this.state.npmDescription);

		return (
			<div id='App'>

				<div className='row'>
					<button onClick={this.save}>Save</button>
					<input type='text' onChange={this.saveProjectName} placeholder='Enter your project name'/>
					<Download download={this.download.bind(this)}/>
				</div>

				<Login
					loggedIn = {this.state.loggedIn}
					saveUser={this.saveUser}
					login={this.login}
					username={this.getUsername}
					password={this.getPassword}
				/>

				<div className='row'>
					<Gulpoptions
						addTask={this.newTasks.bind(this)}
						 paths={this.state.paths}
						 accordionSection={this.accordionSection.bind(this)}
						 accordionState={this.state.accordionIsOpen}
						 gulpBasic={this.gulpBasic}
						 gulpReact={this.gulpReact}
						 gulpAngular={this.gulpAngular}
						 gulpBootstrap={this.gulpBootstrap}
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
