import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import Gulpview from './Gulpview';
import Packagejson from './Packagejson';
import Download from './Download';
import Gulpoptions from './Gulpoptions';
var constants = require('./constants/json');



export default class App extends Component {
	// var strict = "use strict";

	constructor(props) {
		super(props);
		// React in ES6
		// http://www.jackcallister.com/2015/08/30/the-react-quick-start-guide-es6-edition.html
		 this.state = {
			 code: constants.getDefaultGulp(),
			 json: constants.getDefaultJson(),
			 npmSearch: null,
			 npmPackage: [],
			 npmDescription: [],
			 gulpSearch: null,
			 gulpPlugin: [],
			 gulpDescription: []
		 };
		 this.searchNPM = this.searchNPM.bind(this);
		 this.searchGulp = this.searchGulp.bind(this);
	 }

	//  Updates state every time something changes in the sandbox
	updateCode(newCode) {
		this.setState({ code: newCode });
	}

	updateJson(newJson) {
		this.setState({ json: newJson });
	}

	// Sends currents state to server to get turned into zip
	postRequest(e) {
		e.preventDefault();
		let gulpState = this.state.code;
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

// Adds or removes new task to code on chekbox click. Note, this can be done much better and more consisely. jQuery is not needed.
	newTasks() {
		// jQuery will return either the value if checked, or undefined
		let addonObj = {
			minify : $('.minify:checked').val(),
			closure : $('.closure:checked').val(),
		};
		console.log(addonObj);
		let requireCode = code.require;
		let gulpCode = code.gulp;
		// let require;
		// checks which values are true and displays them
		for (var val in addonObj){
			console.log(val);
			if (addonObj[val]) {
				var require = val + 'Require';
				requireCode += code[require];
				gulpCode += code[val];
			}
		}
		let displayedCode = requireCode + gulpCode + code.gulpTask;
		this.setState({code: displayedCode});
	 }

	 // Search NPM packages
	 searchNPM(event) {
		 event.preventDefault();

		 // Get request to NPM search for the package name from user input
		$.get(`http://npmsearch.com/query?fields=name,keywords,rating,description&q=name:${event.target.value}&sort=rating:desc`, (data) => {

			const pkgName = this.state.npmPackage;
			const pkgDesc = this.state.npmDescription;
			data = JSON.parse(data).results;

			// Retrieving desired data from results
			data.forEach((pkg) => {
				// This check makes sure no duplicate elements are pushed to the state array
				if (pkgName.findIndex((el) => {return el === pkg.name[0]}) === -1){
					pkgName.push(pkg.name[0]);
					pkgDesc.push(pkg.description[0]);
				}
			});

			// Setting the state from the new arrays
			this.setState({npmPackage: pkgName, npmDescription: pkgDesc});
		});
	}


	searchGulp(event) {
		event.preventDefault();

		// Get request to NPM search for the package name from user input
	 $.get(`http://npmsearch.com/query?fields=name,description&q=keywords:gulpfriendly&q=keywords:gulpplugin&q=name:${event.target.value}&sort=rating:desc`, (data) => {

		 const pluginName = this.state.npmPackage;
		 const pluginDesc = this.state.npmDescription;
		 data = JSON.parse(data).results;

		 // Retrieving desired data from results
		 data.forEach((pkg) => {
			 // This check makes sure no duplicate elements are pushed to the state array
			 if (pluginName.findIndex((el) => {return el === pkg.name[0]}) === -1){
				 pluginName.push(pkg.name[0]);
				 pluginDesc.push(pkg.description[0]);
			 }
		 });

		 // Setting the state from the new arrays
		 this.setState({gulpPlugin: pluginName, gulpDescription: pluginDesc});
	 });
	}

	// UNFINISHED: Need to figure out how to add it to the state
	 addToPackageJson (event) {
		 event.preventDefault();
		 console.log('You clicked on the button');
	 }

	render() {
		// console.log('here is the json obj', packJson.getDefaultJson());

		let searchResultsJ = [];
		let searchResultsG = [];
		const names = this.state.npmPackage;
		const desc = this.state.npmDescription;
		const namesG = this.state.gulpPlugin;
		const descG = this.state.gulpDescription;


		for (var i = 0; i < names.length; i++) {
			searchResultsJ.push(<option value={names[i]} key={i}>{desc[i]}</option>);
		}

		for (var j = 0; j < namesG.length; j++) {
			searchResultsG.push(<option value={names[j]} key={j}>{descG[j]}</option>);
		}

		return (
			<div id='App'>

				<form id='npm-search'>
					 <input type="search" list="packages" placeholder="Search NPM Packages" onChange={this.searchNPM}></input>
					 <datalist id="packages">{searchResultsJ}</datalist>
					 <button onClick={this.addToPackageJson}>+ package.json</button>
				</form>

				<form id='gulp-search'>
					 <input type="search" list="plugins" placeholder="Search Gulp Plug-Ins" onChange={this.searchGulp}></input>
					 <datalist id="plugins">{searchResultsG}</datalist>
					 <button onClick={this.addToPackageJson}>+ gulpfile.js</button>
				</form>

				<Gulpoptions addTask={this.newTasks}/>

				<div id="code">
					<Gulpview value={this.state.code} codeChange={this.updateCode.bind(this)}/>
					<Packagejson value={this.state.json} jsonChange={this.updateJson.bind(this)}/>
				</div>

				<Download download={this.postRequest.bind(this)} />

			</div>
		)
	}
}


render(<App />, document.getElementById('main-container'));
