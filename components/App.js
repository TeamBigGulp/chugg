import React, {Component} from 'react';
import {render} from 'react-dom';
import Download from './Download';
import Gulpoptions from './Gulpoptions';
import {Tabs} from 'react-bootstrap';
import {Tab} from 'react-bootstrap';

import Packagejson from './Packagejson';
import Gulpview from './Gulpview';

import $ from 'jquery';


//object representing starter gulpfile
// Next group, please try to find a more efficient way of making the constent in this object
const code = {
				require: "var gulp = require('gulp'); \nvar browserify = require('browserify'); \nvar babelify = require('babelify'); \nvar watchify = require('watchify'); \nvar source = require('vinyl-source-stream'); \nvar notify = require('gulp-notify'); \nvar nodemon = require('gulp-nodemon');",
				gulp: "\n\nfunction handleErrors() { \n\tvar args = Array.prototype.slice.call(arguments); \n\tnotify.onError({ \n\t\ttitle : 'Compile Error', \n\t\tmessage : '<%= error.message %>' \n\t}).apply(this, args); \n\tthis.emit('end'); //keeps gulp from hanging on this task \n\t} \nfunction buildScript(file, watch) { \n\tvar props = { \n\t\tentries : ['./components/' + file], \n\t\tdebug : true, \n\t\ttransform : babelify.configure({ \n\t\t\tpresets: ['react', 'es2015'] \n\t\t}) \n}; \n\n//watchify if watch set to true. otherwise browserify once \nvar bundler = watch ? watchify(browserify(props)) : browserify(props); \nfunction rebundle(){ \n\tvar stream = bundler.bundle(); \n\treturn stream \n\t\t.on('error', handleErrors) \n\t\t.pipe(source('bundle.js')) \n\t\t.pipe(gulp.dest('./build/')); \n\t} \n\t\tbundler.on('update', function() { \n\t\tvar updateStart = Date.now(); \n\t\trebundle(); \n\t\vconsole.log('Updated!', (Date.now() - updateStart) + 'ms'); \n\t}) \n\n\t// run it once the first time buildScript is called \n\treturn rebundle(); \n\t} \n\n// run once \ngulp.task('scripts', function() { \n\treturn buildScript('App.js', false); \n}); \n\n//run nodemon \ngulp.task('start', function() { \n\tnodemon({ \n\t\tscript: 'server/server.js', \n\t\text: 'js html', \n\t\tenv: {'NODE_ENV': 'development'} \n\t}) \n}); \n\n//run 'scripts' task first, then watch for future changes",
				gulpTask: "\ngulp.task('default', ['scripts', 'start'], function() { \n\treturn buildScript('App.js', true); \n});",
				minifyRequire: "\nvar minifyCss = require('gulp-minify-css');",
				minify:"\n// task\n gulp.task('css-nano', function () {\n\t  gulp.src('./Css/one.css') // path to your file\n\t.pipe(minifyCss())\n\t .pipe(gulp.dest('path/to/destination'));\n\t});",
				closureRequire: "\nvar closureCompiler = require('gulp-closure-compiler');",
				closure:     "\n    gulp.task('default', function() {\n\t return gulp.src('src/*.js')\n\t\t.pipe(closureCompiler({\n\t\t compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar', \n\t\tfileName: 'build.js'\n\t}))\n\t .pipe(gulp.dest('dist'));\n    });"
		};

const theJSON = '{\n"name": "<enter the name of your project here>",\n\t  "version": "1.0.0",\n\t"description": "<enter a description of your project here>",\n\t "main": "index.js",\n\t"scripts": {\n\t\t"prestart": "npm run task",\n\t\t"start": "node server/server.js",\n\t\t"start-dev": "npm run task",\n\t\t"task": "gulp"\n\t  },\n\t"dependencies": {\n\t"babel-preset-es2015": "^6.0.15",\n\t\t"babel-preset-react": "^6.0.15",\n\t\t"babelify": "^7.2.0",\n\t\t"browserify": "^10.2.4",\n\t\t"gulp": "^3.9.0",\n\t\t"react": "^0.14",\n\t\t"react-dom": "^0.14.0",\n\t\t"vinyl-source-stream": "^1.1.0"\n\t\t},\n\t"devDependencies": {\n\t\t"body-parser": "^1.15.0",\n\t\t"gulp-nodemon": "^2.0.6",\n\t\t"gulp-notify": "^2.2.0",\n\t\t"watchify": "^3.2.2"\n\t},\n\t"author": "<your name here>",\n\t"license": "ISC"\n\t}';


export default class App extends Component {
	constructor(props) {
    super(props);
    // http://www.jackcallister.com/2015/08/30/the-react-quick-start-guide-es6-edition.html
		 this.state = {
			 code: code.require + code.gulp + code.gulpTask,
			 json: theJSON
		 };
	 }

	//  Updates state every time soething changes in the sandbox
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

	render() {
		return (
			<div id='App'>

        <div className="row">
          <Download download={this.postRequest.bind(this)} />
        </div>

        <div className="row">

          <Gulpoptions addTask={this.newTasks.bind(this)} />

          <div className="col-md-7">

            <Tabs defaultActiveKey={1}>
              <Tab eventKey={1} title="Gulpfile">
                <Gulpview value={this.state.code} codeChange={this.updateCode.bind(this)} />
              </Tab>

              <Tab eventKey={2} title="package.json">
                <Packagejson value={this.state.json} jsonChange={this.updateJson.bind(this)} />
              </Tab>
            </Tabs>

          </div>

        </div>
		)
	}
}

render(<App />, document.getElementById('main-container'));
