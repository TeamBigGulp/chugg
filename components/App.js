import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import Gulpview from './Gulpview';
import Packagejson from './Packagejson';
import Download from './Download';
import Gulpoptions from './Gulpoptions';
import constants from './constants/default';
const defaultJson = constants.getDefaultJson();
const defaultGulp = constants.getDefaultGulp();

// React in ES6
// http://www.jackcallister.com/2015/08/30/the-react-quick-start-guide-es6-edition.html
export default class App extends Component {
	// "use strict";
	constructor(props) {
		super(props);
		 this.state = {
			 code: defaultGulp,
			 json: defaultJson.start + defaultJson.end,
			 jsonDependencies: '',
			 npmSearch: null,
			 npmPackage: [],
			 npmDescription: [],
			 gulpSearch: null,
			 gulpPlugin: [],
			 gulpDescription: []
		 };
		 this.searchNPM = this.searchNPM.bind(this);
		 this.searchGulp = this.searchGulp.bind(this);
		 this.addToPackageJson = this.addToPackageJson.bind(this);
	 }

	//  Updates state every time something changes in the sandbox
	updateCode(newCode) {
		this.setState({ code: newCode });
	}

	updateJson(newJson) {
		this.setState({ json: newJson });
	}

	// Sends currents state to server to get turned into zip
	postRequest(event) {
		event.preventDefault();
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
	// newTasks() {
	// 	// jQuery will return either the value if checked, or undefined
	// 	let addonObj = {
	// 		minify : $('.minify:checked').val(),
	// 		closure : $('.closure:checked').val(),
	// 	};
	// 	console.log(addonObj);
	// 	let requireCode = code.require;
	// 	let gulpCode = code.gulp;
	// 	// let require;
	// 	// checks which values are true and displays them
	// 	for (var val in addonObj){
	// 		console.log(val);
	// 		if (addonObj[val]) {
	// 			var require = val + 'Require';
	// 			requireCode += code[require];
	// 			gulpCode += code[val];
	// 		}
	// 	}
	// 	let displayedCode = requireCode + gulpCode + code.gulpTask;
	// 	this.setState({code: displayedCode});
	//  }

	 // Search NPM packages
	 searchNPM(event) {
		 event.preventDefault();
		 const searchValue = event.target.value;

		 // Get request to NPM search for the package name from user input
		$.get(`http://npmsearch.com/query?fields=name,keywords,rating,description,version&q=name:${event.target.value}&sort=rating:desc`, (data) => {

			data = JSON.parse(data).results;

			const pkgName = this.state.npmPackage;
			const pkgDesc = this.state.npmDescription;

			// Retrieving desired data from results
			data.forEach((pkg) => {
				// This check makes sure no duplicate elements are pushed to the state array
				if (pkgName.findIndex((el) => {return el === pkg.name[0]}) === -1){
					pkgName.push(pkg.name[0]);
					pkgDesc.push(pkg.description[0]);
				}
			});

			// Setting the state from the new arrays
			this.setState({npmSearch: searchValue, npmPackage: pkgName, npmDescription: pkgDesc});
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

	// Adds new package to package.json in dependencies
	 addToPackageJson (event) {
		 event.preventDefault();
		 let pkgVersion;

		 // Gets the package version of the current search
		 $.get(`http://npmsearch.com/query?fields=name,keywords,rating,description,version&q=name:${this.state.npmSearch}`, (data) => {
			 data = JSON.parse(data).results;
			 pkgVersion = data[0].version[0];
		 }).done(() => {
			 let newPackages = this.state.jsonDependencies;
			 newPackages += `,\n\t"${this.state.npmSearch}": "^${pkgVersion}"`;
			 this.setState({json: defaultJson.start + newPackages + defaultJson.end, jsonDependencies: newPackages});
		 })

	 }

	 createSearchResults(nameArr, descArr) {
		 let resultsArr = [];
		 let counter = 0;
		 nameArr.forEach((name) => {
			 resultsArr.push(<option value={name} key={counter}>{descArr[counter]}</option>);
			 counter++;
		 })
		return resultsArr;
	 }

	render() {

		let npmResults = this.createSearchResults(this.state.npmPackage, this.state.npmDescription);
		let gulpResults = this.createSearchResults(this.state.gulpPlugin, this.state.gulpDescription);

		return (
			<div id='App'>

				<form id='npm-search'>
					 <input type="search" list="packages" placeholder="Search NPM Packages" onChange={this.searchNPM}></input>
					 <datalist id="packages">{npmResults}</datalist>
					 <button onClick={this.addToPackageJson}>+ package.json</button>
				</form>

				<form id='gulp-search'>
					 <input type="search" list="plugins" placeholder="Search Gulp Plug-Ins" onChange={this.searchGulp}></input>
					 <datalist id="plugins">{gulpResults}</datalist>
					 <button onClick={this.addToPackageJson}>+ gulpfile.js</button>
				</form>


				<div id="code">
					<Gulpview value={this.state.code} codeChange={this.updateCode.bind(this)}/>
					<Packagejson value={this.state.json} jsonChange={this.updateJson.bind(this)}/>
				</div>

				<Download download={this.postRequest.bind(this)} />

			</div>
		)
	}
}

// Took out Gulp options for the time being (minify and closure)
// <Gulpoptions addTask={this.newTasks}/>

render(<App />, document.getElementById('main-container'));
