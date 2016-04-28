/* eslint-disable quotes */
/* eslint-disable max-len */

module.exports = {

  getDefaultJson() {
    return {
      react: {
        start: `    {
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
    }`,
      },
      angular: {
        start: `    {
    "name": "healthy-gulp-angular",
    "private": true,
    "version": "0.0.0",
    "repository": "",
    "scripts": {
      "postinstall": "bower install",
      "prestart": "npm install",
      "start": "node server.js"
    },
    "devDependencies": {
      "body-parser": "^1.5.2",
      "bower": "^1.3.1",
      "del": "^1.1.1",
      "event-stream": "^3.2.2",
      "express": "^4.7.2",
      "gulp": "^3.8.10",
      "gulp-angular-filesort": "^1.0.4",
      "gulp-concat": "^2.4.3",
      "gulp-htmlhint": "0.0.9",
      "gulp-htmlmin": "^1.0.0",
      "gulp-inject": "^1.1.1",
      "gulp-jshint": "^1.9.2",
      "gulp-livereload": "^3.7.0",
      "gulp-load-plugins": "^0.8.0",
      "gulp-minify-css": "^0.4.5",
      "gulp-ng-html2js": "^0.1.8",
      "gulp-nodemon": "^1.0.5",
      "gulp-order": "^1.1.1",
      "gulp-print": "^1.1.0",
      "gulp-rename": "^1.2.0",
      "gulp-sass": "^1.3.2",
      "gulp-sourcemaps": "^1.3.0",
      "gulp-uglify": "^1.1.0",
      "jshint-stylish": "^1.0.0",
      "karma": "^0.10",
      "karma-junit-reporter": "^0.2.2",
      "main-bower-files": "^2.5.0",
      "method-override": "^2.1.2",
      "protractor": "^1.1.1",
      "q": "^1.1.2",
      "shelljs": "^0.2.6"`,
        end: `
      }
    }` },
      bootstrap: {
        start: `    {
      "name": "gulp",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "author": "",
      "license": "ISC",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "devDependencies": {
        "gulp": "^3.8.11",
        "gulp-sass": "^2.0.1",
        "wiredep": "^3.0.0",
        "del": "^2.2.0",
        "main-bower-files": "^1.3.1",
        "gulp-filter": "^3.0.1",
        "gulp-concat": "^2.6.0",
        "gulp-csso": "1.0.1"`,
        end: `
      }
    }`,
      },
      basic: {
        start: `    {
      "name": "<project name>",
      "description": "<project description>",
      "version": "1.0.0",
      "author": "<your name>",
      "license": "ISC",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "devDependencies": {
        "gulp": "~3.9.0",
        "gulp-autoprefixer": "2.0.0",
        "gulp-cache": "~0.2.4",
        "gulp-concat": "~2.4.2",
        "gulp-connect": "^2.2.0",
        "gulp-imagemin": "~2.0.0",
        "gulp-jshint": "~1.9.0",
        "gulp-livereload": "~2.1.0",
        "gulp-notify": "~2.0.1",
        "gulp-rename": "~1.2.0",
        "gulp-sass": "~1.1.0",
        "gulp-uglify": "~1.0.1",
        "tiny-lr": "0.0.7"`,
        end: `
        }
    }`,
      },
    };
  },

  getDefaultGulp() {
    return {
      react: {
        start: `// Include Gulp
var gulp = require('gulp');

// Include Our Plugins
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');`,
        tasks: `

// Handle Errors
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title : 'Compile Error',
    message : '<%= error.message %>'
  }).apply(this, args);
  //console.log('Compile error: ', args);
  this.emit('end'); //keeps gulp from hanging on this task
}

// Build bundle.js
function buildScript(file, watch) {
  var props = {
    entries : ['./components/' + file],
    debug : true,
    transform : babelify.configure({
                presets: ["react", "es2015"]
                })
  };

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

  // (run it once the first time buildScript is called)
  return rebundle();
}

// Run Once
gulp.task('scripts', function() {
  return buildScript('App.js', false);
});

// Run Nodemon
gulp.task('start', function() {
  nodemon({
    script: 'server/server.js',
    ext: 'js html',
    env: {'NODE_ENV': 'development'}
  })
});

// Run 'scripts', Then Watch For Future Changes
gulp.task('default', ['scripts', 'start'], function() {
  return buildScript('App.js', true);
});
`,
        minify: `var minifyCss = require('gulp-minify-css');",`,
        minifyTask: `\n// task\n gulp.task('css-nano', function () {\n\t  gulp.src('./Css/one.css') // path to your file\n\t.pipe(minifyCss())\n\t .pipe(gulp.dest('path/to/destination'));\n\t});`,
        closure: `var closureCompiler = require('gulp-closure-compiler');`,
        closureTask: `\n    gulp.task('default', function() {\n\t return gulp.src('src/*.js')\n\t\t.pipe(closureCompiler({\n\t\t compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar', \n\t\tfileName: 'build.js'\n\t}))\n\t .pipe(gulp.dest('dist'));\n    });`,

      },
      angular: {
        start: `// Include Gulp
var gulp = require('gulp');

// Include Our Plugins
var plugins = require('gulp-load-plugins')();
var del = require('del');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');
var print = require('gulp-print');
var Q = require('q');`,
        tasks: `

// Customize Your Paths
var paths = {
    scripts: 'app/**/*.js',
    styles: ['./app/**/*.css', './app/**/*.scss'],
    images: './images/**/*',
    index: './app/index.html',
    partials: ['app/**/*.html', '!app/index.html'],
    distDev: './dist.dev',
    distProd: './dist.prod',
    distScriptsProd: './dist.prod/scripts',
    scriptsDevServer: 'devServer/**/*.js'
};

// == PIPE SEGMENTS ========

var pipes = {};

pipes.orderedVendorScripts = function() {
    return plugins.order(['jquery.js', 'angular.js']);
};

pipes.orderedAppScripts = function() {
    return plugins.angularFilesort();
};

pipes.minifiedFileName = function() {
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};

pipes.validatedAppScripts = function() {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.builtAppScriptsDev = function() {
    return pipes.validatedAppScripts()
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtAppScriptsProd = function() {
    var scriptedPartials = pipes.scriptedPartials();
    var validatedAppScripts = pipes.validatedAppScripts();

    return es.merge(scriptedPartials, validatedAppScripts)
        .pipe(pipes.orderedAppScripts())
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('app.min.js'))
            .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.builtVendorScriptsDev = function() {
    return gulp.src(bowerFiles())
        .pipe(gulp.dest('dist.dev/bower_components'));
};

pipes.builtVendorScriptsProd = function() {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.validatedDevServerScripts = function() {
    return gulp.src(paths.scriptsDevServer)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.validatedPartials = function() {
    return gulp.src(paths.partials)
        .pipe(plugins.htmlhint({'doctype-first': false}))
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtPartialsDev = function() {
    return pipes.validatedPartials()
        .pipe(gulp.dest(paths.distDev));
};

pipes.scriptedPartials = function() {
    return pipes.validatedPartials()
        .pipe(plugins.htmlhint.failReporter())
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(plugins.ngHtml2js({
            moduleName: "healthyGulpAngularApp"
        }));
};

pipes.builtStylesDev = function() {
    return gulp.src(paths.styles)
        .pipe(plugins.sass())
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtStylesProd = function() {
    return gulp.src(paths.styles)
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write())
        .pipe(pipes.minifiedFileName())
        .pipe(gulp.dest(paths.distProd));
};

pipes.processedImagesDev = function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distDev + '/images/'));
};

pipes.processedImagesProd = function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distProd + '/images/'));
};

pipes.validatedIndex = function() {
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtIndexDev = function() {

    var orderedVendorScripts = pipes.builtVendorScriptsDev()
        .pipe(pipes.orderedVendorScripts());

    var orderedAppScripts = pipes.builtAppScriptsDev()
        .pipe(pipes.orderedAppScripts());

    var appStyles = pipes.builtStylesDev();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
        .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(orderedAppScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtIndexProd = function() {

    var vendorScripts = pipes.builtVendorScriptsProd();
    var appScripts = pipes.builtAppScriptsProd();
    var appStyles = pipes.builtStylesProd();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distProd)) // write first to get relative path for inject
        .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(appScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.distProd));
};

pipes.builtAppDev = function() {
    return es.merge(pipes.builtIndexDev(), pipes.builtPartialsDev(), pipes.processedImagesDev());
};

pipes.builtAppProd = function() {
    return es.merge(pipes.builtIndexProd(), pipes.processedImagesProd());
};

// == TASKS ========

// removes all compiled dev files
gulp.task('clean-dev', function() {
    var deferred = Q.defer();
    del(paths.distDev, function() {
        deferred.resolve();
    });
    return deferred.promise;
});

// removes all compiled production files
gulp.task('clean-prod', function() {
    var deferred = Q.defer();
    del(paths.distProd, function() {
        deferred.resolve();
    });
    return deferred.promise;
});

// checks html source files for syntax errors
gulp.task('validate-partials', pipes.validatedPartials);

// checks index.html for syntax errors
gulp.task('validate-index', pipes.validatedIndex);

// moves html source files into the dev environment
gulp.task('build-partials-dev', pipes.builtPartialsDev);

// converts partials to javascript using html2js
gulp.task('convert-partials-to-js', pipes.scriptedPartials);

// runs jshint on the dev server scripts
gulp.task('validate-devserver-scripts', pipes.validatedDevServerScripts);

// runs jshint on the app scripts
gulp.task('validate-app-scripts', pipes.validatedAppScripts);

// moves app scripts into the dev environment
gulp.task('build-app-scripts-dev', pipes.builtAppScriptsDev);

// concatenates, uglifies, and moves app scripts and partials into the prod environment
gulp.task('build-app-scripts-prod', pipes.builtAppScriptsProd);

// compiles app sass and moves to the dev environment
gulp.task('build-styles-dev', pipes.builtStylesDev);

// compiles and minifies app sass to css and moves to the prod environment
gulp.task('build-styles-prod', pipes.builtStylesProd);

// moves vendor scripts into the dev environment
gulp.task('build-vendor-scripts-dev', pipes.builtVendorScriptsDev);

// concatenates, uglifies, and moves vendor scripts into the prod environment
gulp.task('build-vendor-scripts-prod', pipes.builtVendorScriptsProd);

// validates and injects sources into index.html and moves it to the dev environment
gulp.task('build-index-dev', pipes.builtIndexDev);

// validates and injects sources into index.html, minifies and moves it to the dev environment
gulp.task('build-index-prod', pipes.builtIndexProd);

// builds a complete dev environment
gulp.task('build-app-dev', pipes.builtAppDev);

// builds a complete prod environment
gulp.task('build-app-prod', pipes.builtAppProd);

// cleans and builds a complete dev environment
gulp.task('clean-build-app-dev', ['clean-dev'], pipes.builtAppDev);

// cleans and builds a complete prod environment
gulp.task('clean-build-app-prod', ['clean-prod'], pipes.builtAppProd);

// clean, build, and watch live changes to the dev environment
gulp.task('watch-dev', ['clean-build-app-dev', 'validate-devserver-scripts'], function() {

    // start nodemon to auto-reload the dev server
    plugins.nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'development'} })
        .on('change', ['validate-devserver-scripts'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    // start live-reload server
    plugins.livereload.listen({ start: true });

    // watch index
    gulp.watch(paths.index, function() {
        return pipes.builtIndexDev()
            .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsDev()
            .pipe(plugins.livereload());
    });

    // watch html partials
    gulp.watch(paths.partials, function() {
        return pipes.builtPartialsDev()
            .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipes.builtStylesDev()
            .pipe(plugins.livereload());
    });

});

// clean, build, and watch live changes to the prod environment
gulp.task('watch-prod', ['clean-build-app-prod', 'validate-devserver-scripts'], function() {

    // start nodemon to auto-reload the dev server
    plugins.nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'production'} })
        .on('change', ['validate-devserver-scripts'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    // start live-reload server
    plugins.livereload.listen({start: true});

    // watch index
    gulp.watch(paths.index, function() {
        return pipes.builtIndexProd()
            .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    // watch hhtml partials
    gulp.watch(paths.partials, function() {
        return pipes.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipes.builtStylesProd()
            .pipe(plugins.livereload());
    });

});

// default task builds for prod
gulp.task('default', ['clean-build-app-prod']);
more
// For more information, visit: http://paislee.io/a-healthy-gulp-setup-for-angularjs-projects/`,
      },
      bootstrap: {
        start: `// Include Gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var csso = require('gulp-csso');`,
        tasks: `

// Workflow For Combining Sass and Bootstrap
gulp.task('clean', function(cb){
  del(['dist'], cb);
});

gulp.task('styles', function(){
  var injectAppFiles = gulp.src('src/styles/*.scss', {read: false});
  var injectGlobalFiles = gulp.src('src/global/*.scss', {read: false});

  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  var injectGlobalOptions = {
    transform: transformFilepath,
    starttag: '// inject:global',
    endtag: '// endinject',
    addRootSlash: false
  };

  return gulp.src('src/main.scss')
    .pipe(wiredep())
    .pipe(inject(injectGlobalFiles, injectGlobalOptions))
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('dist/styles'));
});

// Add Non-Sass CSS Dependencies
gulp.task('vendors', function(){
  return gulp.src(mainBowerFiles())
    .pipe(filter('*.css'))
    .pipe(concat('vendors.css'))
    .pipe(csso())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('default', ['clean', 'vendors', 'styles'], function(){
  var injectFiles = gulp.src(['dist/styles/main.css', 'dist/styles/vendors.css']);

  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };

  return gulp.src('src/index.html')
    .pipe(inject(injectFiles, injectOptions))
    .pipe(gulp.dest('dist'));
});

// For more information, visit: http://david-barreto.com/working-with-sass-bootstrap-and-gulp/.`,
      },
      basic: {
        start: `// Include Gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');`,
        tasks: `

// Lint Task (checks for syntax errors)
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);`,
      },
    };
  },
};
