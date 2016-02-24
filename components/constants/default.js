module.exports = {

	getDefaultJson() {
		return {
			start: `{
	"name": "<enter the name of your project here>",
	"version": "1.0.0",
	"description": "<enter a description of your project here>",
	"main": "index.js",
	"scripts": {
	"prestart": "npm run task",
	"start": "node server/server.js",
	"start-dev": "npm run task",
	"task": "gulp"
	},
	"dependencies": {
	"babel-preset-es2015": "^6.0.15",
	"babel-preset-react": "^6.0.15",
	"babelify": "^7.2.0",
	"browserify": "^10.2.4",
	"gulp": "^3.9.0",
	"react": "^0.14",
	"react-dom": "^0.14.0",
	"vinyl-source-stream": "^1.1.0"`,
	// Not using this function anymore, but keeping for reference
		add: function(input) {
			console.log('hey!');
			this.dependencies += input;
		},
		end: `
	},
	"devDependencies": {
		"body-parser": "^1.15.0",
		"gulp-nodemon": "^2.0.6",
		"gulp-notify": "^2.2.0",
		"watchify": "^3.2.2"
	},
	"author": "<your name here>",
	"license": "ISC"
}`
	}
},

	getDefaultGulp() {
		return {
			start: `var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');`,
			tasks:`

function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title : 'Compile Error',
		message : '<%= error.message %>'
	}).apply(this, args);
	this.emit('end'); //keeps gulp from hanging on this task
}

function buildScript(file, watch) {
	var props = {
		entries : ['./components/' + file],
		debug : true,
		transform : babelify.configure({
			presets: ['react', 'es2015']
		})
	};

	//watchify if watch set to true. otherwise browserify once
	var bundler = watch ? watchify(browserify(props)) : browserify(props);

	function rebundle(){
		var stream = bundler.bundle();
		return stream
			.on('error', handleErrors)
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./build/'));
	}

	bundler.on('update', function() {
	var updateStart = Date.now();
	rebundle();
	console.log('Updated!', (Date.now() - updateStart) + 'ms');
	})

	// run it once the first time buildScript is called
	return rebundle();
}

// run once
gulp.task('scripts', function() {
	return buildScript('App.js', false);
});

//run nodemon
gulp.task('start', function() {
	nodemon({
		script: 'server/server.js',
		ext: 'js html',
		env: {'NODE_ENV': 'development'}
	})
});

//run 'scripts' task first, then watch for future changes
gulp.task('default', ['scripts', 'start'], function() {
	return buildScript('App.js', true);
});`,
		minify: `var minifyCss = require('gulp-minify-css');",`,
		minifyTask: `\n// task\n gulp.task('css-nano', function () {\n\t  gulp.src('./Css/one.css') // path to your file\n\t.pipe(minifyCss())\n\t .pipe(gulp.dest('path/to/destination'));\n\t});`,
		closure: `var closureCompiler = require('gulp-closure-compiler');`,
		closureTask: `\n    gulp.task('default', function() {\n\t return gulp.src('src/*.js')\n\t\t.pipe(closureCompiler({\n\t\t compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar', \n\t\tfileName: 'build.js'\n\t}))\n\t .pipe(gulp.dest('dist'));\n    });`
		}
	}
}
// const theJSON = '{\n"name": "<enter the name of your project here>",\n\t  "version": "1.0.0",\n\t"description": "<enter a description of your project here>",\n\t "main": "index.js",\n\t"scripts": {\n\t\t"prestart": "npm run task",\n\t\t"start": "node server/server.js",\n\t\t"start-dev": "npm run task",\n\t\t"task": "gulp"\n\t  },\n\t"dependencies": {\n\t"babel-preset-es2015": "^6.0.15",\n\t\t"babel-preset-react": "^6.0.15",\n\t\t"babelify": "^7.2.0",\n\t\t"browserify": "^10.2.4",\n\t\t"gulp": "^3.9.0",\n\t\t"react": "^0.14",\n\t\t"react-dom": "^0.14.0",\n\t\t"vinyl-source-stream": "^1.1.0"\n\t\t},\n\t"devDependencies": {\n\t\t"body-parser": "^1.15.0",\n\t\t"gulp-nodemon": "^2.0.6",\n\t\t"gulp-notify": "^2.2.0",\n\t\t"watchify": "^3.2.2"\n\t},\n\t"author": "<your name here>",\n\t"license": "ISC"\n\t}';

// const code = {
// 				require: "var gulp = require('gulp'); \nvar browserify = require('browserify'); \nvar babelify = require('babelify'); \nvar watchify = require('watchify'); \nvar source = require('vinyl-source-stream'); \nvar notify = require('gulp-notify'); \nvar nodemon = require('gulp-nodemon');",
// 				gulp: "\n\nfunction handleErrors() { \n\tvar args = Array.prototype.slice.call(arguments); \n\tnotify.onError({ \n\t\ttitle : 'Compile Error', \n\t\tmessage : '<%= error.message %>' \n\t}).apply(this, args); \n\tthis.emit('end'); //keeps gulp from hanging on this task \n\t} \nfunction buildScript(file, watch) { \n\tvar props = { \n\t\tentries : ['./components/' + file], \n\t\tdebug : true, \n\t\ttransform : babelify.configure({ \n\t\t\tpresets: ['react', 'es2015'] \n\t\t}) \n}; \n\n//watchify if watch set to true. otherwise browserify once \nvar bundler = watch ? watchify(browserify(props)) : browserify(props); \nfunction rebundle(){ \n\tvar stream = bundler.bundle(); \n\treturn stream \n\t\t.on('error', handleErrors) \n\t\t.pipe(source('bundle.js')) \n\t\t.pipe(gulp.dest('./build/')); \n\t} \n\t\tbundler.on('update', function() { \n\t\tvar updateStart = Date.now(); \n\t\trebundle(); \n\t\vconsole.log('Updated!', (Date.now() - updateStart) + 'ms'); \n\t}) \n\n\t// run it once the first time buildScript is called \n\treturn rebundle(); \n\t} \n\n// run once \ngulp.task('scripts', function() { \n\treturn buildScript('App.js', false); \n}); \n\n//run nodemon \ngulp.task('start', function() { \n\tnodemon({ \n\t\tscript: 'server/server.js', \n\t\text: 'js html', \n\t\tenv: {'NODE_ENV': 'development'} \n\t}) \n}); \n\n//run 'scripts' task first, then watch for future changes",
// 				gulpTask: "\ngulp.task('default', ['scripts', 'start'], function() { \n\treturn buildScript('App.js', true); \n});",
// 				minifyRequire: "\nvar minifyCss = require('gulp-minify-css');",
// 				minify:"\n// task\n gulp.task('css-nano', function () {\n\t  gulp.src('./Css/one.css') // path to your file\n\t.pipe(minifyCss())\n\t .pipe(gulp.dest('path/to/destination'));\n\t});",
// 				closureRequire: "\nvar closureCompiler = require('gulp-closure-compiler');",
// 				closure:     "\n    gulp.task('default', function() {\n\t return gulp.src('src/*.js')\n\t\t.pipe(closureCompiler({\n\t\t compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar', \n\t\tfileName: 'build.js'\n\t}))\n\t .pipe(gulp.dest('dist'));\n    });"
// 		};
