const React = require('react');
const ReactDOM = require('react-dom');
const Gulpview = require('./Gulpview');
const Packagejson = require('./Packagejson');
const Download = require('./Download');
const Gulpoptions = require('./Gulpoptions');

const $ = require('jquery');


//object representing starter gulpfile
// Next group, please try to find a more efficient way of making the constent in this object
var code = {
				require: "var gulp = require('gulp'); \nvar browserify = require('browserify'); \nvar babelify = require('babelify'); \nvar watchify = require('watchify'); \nvar source = require('vinyl-source-stream'); \nvar notify = require('gulp-notify'); \nvar nodemon = require('gulp-nodemon');",
				gulp: "\n\nfunction handleErrors() { \n\tvar args = Array.prototype.slice.call(arguments); \n\tnotify.onError({ \n\t\ttitle : 'Compile Error', \n\t\tmessage : '<%= error.message %>' \n\t}).apply(this, args); \n\tthis.emit('end'); //keeps gulp from hanging on this task \n\t} \nfunction buildScript(file, watch) { \n\tvar props = { \n\t\tentries : ['./components/' + file], \n\t\tdebug : true, \n\t\ttransform : babelify.configure({ \n\t\t\tpresets: ['react', 'es2015'] \n\t\t}) \n}; \n\n//watchify if watch set to true. otherwise browserify once \nvar bundler = watch ? watchify(browserify(props)) : browserify(props); \nfunction rebundle(){ \n\tvar stream = bundler.bundle(); \n\treturn stream \n\t\t.on('error', handleErrors) \n\t\t.pipe(source('bundle.js')) \n\t\t.pipe(gulp.dest('./build/')); \n\t} \n\t\tbundler.on('update', function() { \n\t\tvar updateStart = Date.now(); \n\t\trebundle(); \n\t\vconsole.log('Updated!', (Date.now() - updateStart) + 'ms'); \n\t}) \n\n\t// run it once the first time buildScript is called \n\treturn rebundle(); \n\t} \n\n// run once \ngulp.task('scripts', function() { \n\treturn buildScript('App.js', false); \n}); \n\n//run nodemon \ngulp.task('start', function() { \n\tnodemon({ \n\t\tscript: 'server/server.js', \n\t\text: 'js html', \n\t\tenv: {'NODE_ENV': 'development'} \n\t}) \n}); \n\n//run 'scripts' task first, then watch for future changes",
				gulpTask: "\ngulp.task('default', ['scripts', 'start'], function() { \n\treturn buildScript('App.js', true); \n});",
				minifyRequire: "\nvar minifyCss = require('gulp-minify-css');",
				minify:"\n// task\n gulp.task('css-nano', function () {\n\t  gulp.src('./Css/one.css') // path to your file\n\t.pipe(minifyCss())\n\t .pipe(gulp.dest('path/to/destination'));\n\t});",
				closureRequire: "\nvar closureCompiler = require('gulp-closure-compiler');",
				closure:     "\n    gulp.task('default', function() {\n\t return gulp.src('src/*.js')\n\t\t.pipe(closureCompiler({\n\t\t compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar', \n\t\tfileName: 'build.js'\n\t}))\n\t .pipe(gulp.dest('dist'));\n    });"
		};

var theJSON = '{\n"name": "<enter the name of your project here>",\n\t  "version": "1.0.0",\n\t"description": "<enter a description of your project here>",\n\t "main": "index.js",\n\t"scripts": {\n\t\t"prestart": "npm run task",\n\t\t"start": "node server/server.js",\n\t\t"start-dev": "npm run task",\n\t\t"task": "gulp"\n\t  },\n\t"dependencies": {\n\t"babel-preset-es2015": "^6.0.15",\n\t\t"babel-preset-react": "^6.0.15",\n\t\t"babelify": "^7.2.0",\n\t\t"browserify": "^10.2.4",\n\t\t"gulp": "^3.9.0",\n\t\t"react": "^0.14",\n\t\t"react-dom": "^0.14.0",\n\t\t"vinyl-source-stream": "^1.1.0"\n\t\t},\n\t"devDependencies": {\n\t\t"body-parser": "^1.15.0",\n\t\t"gulp-nodemon": "^2.0.6",\n\t\t"gulp-notify": "^2.2.0",\n\t\t"watchify": "^3.2.2"\n\t},\n\t"author": "<your name here>",\n\t"license": "ISC"\n\t}';


var App = React.createClass({
	getInitialState: function(){
		 return {
			 code: code.require + code.gulp + code.gulpTask,
			 json: theJSON
		 };
	 },

	//  Updates state every time soething changes in the sandbox
	updateCode: function(newCode) {
		this.setState({ code: newCode });
	},

	updateJson: function(newJson) {
		this.setState({ json: newJson });
	},

	// Sends currents state to server to get turned into zip
	postRequest: function(e){
		e.preventDefault();
		var gulpState = this.state.code;
		$.ajax({
			type: 'POST',
			url: '/gulp',
			data: gulpState,
			contentType: 'text/plain; charset=utf-8',
			success: function(data) {
				window.location.href = '/download';
			}
		});
	},

// Adds or removes new task to code on chekbox click. Note, this can be done much better and more consisely. jQuery is not needed.
	newTasks: function() {
		// jQuery will return either the value if checked, or undefined
		var addonObj = {
			minify : $('.minify:checked').val(),
			closure : $('.closure:checked').val(),
		};
		var requireCode = code.require;
		var gulpCode = code.gulp;
		// checks which values are true and displays them
		for (var val in addonObj){
			if (addonObj[val]) {
				var require = val + 'Require';
				requireCode += code[require];
				gulpCode += code[val];
			}
		}
		var displayedCode = requireCode + gulpCode + code.gulpTask;
		this.setState({code: displayedCode});
	 },

	render: function () {
		return (
			<div id='App'>
			<Gulpoptions addTask={this.newTasks}/>
			<div id="code">
				<Gulpview
					value={this.state.code}
					codeChange={this.updateCode}

					/>
			<Packagejson
					value={this.state.json}
					jsonChange={this.updateJson}
			/>
			</div>
			<Download
			download={this.postRequest}
			/>
			</div>
		)
	}
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
