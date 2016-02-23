// Polyfill for bind from http://stackoverflow.com/questions/25359247/casperjs-bind-issue
// Artjom B. is the author of PhantomJS
// This is required to run on Wade's system, but not Tiffany's
casper.on( 'page.initialized', function(){
    this.evaluate(function(){
        var isFunction = function(o) {
          return typeof o == 'function';
        };

        var bind,
          slice = [].slice,
          proto = Function.prototype,
          featureMap;

        featureMap = {
          'function-bind': 'bind'
        };

        function has(feature) {
          var prop = featureMap[feature];
          return isFunction(proto[prop]);
        }

        // check for missing features
        if (!has('function-bind')) {
          // adapted from Mozilla Developer Network example at
          // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
          bind = function bind(obj) {
            var args = slice.call(arguments, 1),
              self = this,
              nop = function() {
              },
              bound = function() {
                return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
              };
            nop.prototype = this.prototype || {}; // Firefox cries sometimes if prototype is undefined
            bound.prototype = new nop();
            return bound;
          };
          proto.bind = bind;
        }
    });
});

const gulpfile = "var gulp = require('gulp'); \nvar browserify = require('browserify'); \nvar babelify = require('babelify'); \nvar watchify = require('watchify'); \nvar source = require('vinyl-source-stream'); \nvar notify = require('gulp-notify'); \nvar nodemon = require('gulp-nodemon');" +
                "\n\nfunction handleErrors() { \n\tvar args = Array.prototype.slice.call(arguments); \n\tnotify.onError({ \n\t\ttitle : 'Compile Error', \n\t\tmessage : '<%= error.message %>' \n\t}).apply(this, args); \n\tthis.emit('end'); //keeps gulp from hanging on this task \n\t} \nfunction buildScript(file, watch) { \n\tvar props = { \n\t\tentries : ['./components/' + file], \n\t\tdebug : true, \n\t\ttransform : babelify.configure({ \n\t\t\tpresets: ['react', 'es2015'] \n\t\t}) \n}; \n\n//watchify if watch set to true. otherwise browserify once \nvar bundler = watch ? watchify(browserify(props)) : browserify(props); \nfunction rebundle(){ \n\tvar stream = bundler.bundle(); \n\treturn stream \n\t\t.on('error', handleErrors) \n\t\t.pipe(source('bundle.js')) \n\t\t.pipe(gulp.dest('./build/')); \n\t} \n\t\tbundler.on('update', function() { \n\t\tvar updateStart = Date.now(); \n\t\trebundle(); \n\t\vconsole.log('Updated!', (Date.now() - updateStart) + 'ms'); \n\t}) \n\n\t// run it once the first time buildScript is called \n\treturn rebundle(); \n\t} \n\n// run once \ngulp.task('scripts', function() { \n\treturn buildScript('App.js', false); \n}); \n\n//run nodemon \ngulp.task('start', function() { \n\tnodemon({ \n\t\tscript: 'server/server.js', \n\t\text: 'js html', \n\t\tenv: {'NODE_ENV': 'development'} \n\t}) \n}); \n\n//run 'scripts' task first, then watch for future changes" +
                "\ngulp.task('default', ['scripts', 'start'], function() { \n\treturn buildScript('App.js', true); \n});";
const packagejson = '{\n"name": "<enter the name of your project here>",\n\t  "version": "1.0.0",\n\t"description": "<enter a description of your project here>",\n\t "main": "index.js",\n\t"scripts": {\n\t\t"prestart": "npm run task",\n\t\t"start": "node server/server.js",\n\t\t"start-dev": "npm run task",\n\t\t"task": "gulp"\n\t  },\n\t"dependencies": {\n\t"babel-preset-es2015": "^6.0.15",\n\t\t"babel-preset-react": "^6.0.15",\n\t\t"babelify": "^7.2.0",\n\t\t"browserify": "^10.2.4",\n\t\t"gulp": "^3.9.0",\n\t\t"react": "^0.14",\n\t\t"react-dom": "^0.14.0",\n\t\t"vinyl-source-stream": "^1.1.0"\n\t\t},\n\t"devDependencies": {\n\t\t"body-parser": "^1.15.0",\n\t\t"gulp-nodemon": "^2.0.6",\n\t\t"gulp-notify": "^2.2.0",\n\t\t"watchify": "^3.2.2"\n\t},\n\t"author": "<your name here>",\n\t"license": "ISC"\n\t}';

//-------------------------------------------------------------------
// Actual tests start here
casper.test.begin('Chugg Front-End Tests', 9, function suite(test) {
	casper.start('http://localhost:3000', function() {
		test.assertTitle("Chugg", "Chugg title detected");
	})

	.then(function() {
		// Waiting for selector is probably not necessary.
		casper.waitForSelector('#Packagejson', function() {
			// Test for the package.json editor instance
			test.assertExists('div[id="Packagejson"]', "package.json editor detected");
			// Test for the specific package.json text
			test.assertSelectorHasText('#Packagejson', packagejson, 'Package.json text found');
		});
	})

  .then(function() {
    casper.waitForSelector('#Gulpview', function() {
			// Test for the Gulpfile editor instance
			test.assertExists('div[id="Gulpview"]', "Gulpfile editor detected");
			// Test for the specific Gulpfile text
			test.assertSelectorHasText('#Gulpview', gulpfile, 'Gulpfile text found');
		});
  })

	.then(function() {
		// Clicks the 'closure compiler' button
		this.click('input[class="closure"]');
		// Tests if the closure compiler is required
		test.assertTextExists("var closureCompiler = require('gulp-closure-compiler');", 'Closure compiler required');
		// Tests if the gulp task has been added
		test.assertTextExists("compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar', ", 'Closure compiler task added');
	})

  .then(function() {
    // Clicks the 'CSS Nano' button
    this.click('input[class="minify"]');
		// Tests if the closure compiler is required
		test.assertTextExists("var minifyCss = require('gulp-minify-css');", 'Minify compiler required');
  })

	.run(function() {
		test.done();
	});

});
