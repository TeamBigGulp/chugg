/* eslint-disable no-console */
/* eslint-disable prefer-rest-params */

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const notify = require('gulp-notify');
const nodemon = require('gulp-nodemon');
const less = require('gulp-less');


function handleErrors() {
  const args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>',
  }).apply(this, args);
  this.emit('end'); // Keeps gulp from hanging on this task
}

function buildScript(file, watch) {
  const props = {
    entries: [`./components/${file}`],
    debug: true,
    transform: babelify.configure({
      presets: ['react', 'es2015'],
    }),
  };

  // Watchify if watch set to true. Otherwise browserify once.
  const bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    const stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./build/'));
  }

  bundler.on('update', () => {
    const updateStart = Date.now();
    rebundle();
    console.log(`Updated! ${(Date.now() - updateStart)} ms`);
  });

  // Run it once the first time buildScript is called
  return rebundle();
}

// Run once
gulp.task('scripts', () => buildScript('App.js', false));

gulp.task('less', () =>
  gulp.src('node_modules/bootstrap/less/bootstrap.less')
  .pipe(less())
  .pipe(gulp.dest('./build/'))
);

// Run nodemon
gulp.task('start', () => {
  nodemon({
    script: 'server/server.js',
    ignore: ['newgulpfile.js'],
    ext: 'js html',
    env: { NODE_ENV: 'development' },
  });
});

// Run 'scripts' task first, then watch for future changes
gulp.task('default', ['scripts', 'less', 'start'], () => buildScript('App.js', true));
