# Chugg Documentation

Welcome to Chugg, a tool that automates the creation of gulpfiles for react projects. This documentation is targeted for users who are learning to code and want to understand exactly what Gulp does and how to read the gulpfiles we are generating. We also cover all of the features that we are including in our files.

Before you can use Gulp: first, you need to download node, if you do not have it on your computer already. To see if you already have it installed, type `node –v` on your terminal. Then you can type in the following to install Gulp globally: `npm install –g gulp` *(you need to do this before you can use it in your project folder)*.

Then, you want to create your project folder for react, within which you will include the gulpfile.js that we are going to generate for you.

What is Gulp: If you Google, “What is Gulp?” you get this answer: “Gulp is a task/build runner for development. It allows you to do a lot of stuff within your development workflow. You can compile sass files, uglify and compress js files and much more. The kicker for gulp is that its a streaming build system which doesn't write temp files.”

That answer can be a bit confusing for new coders... In layman’s terms, Gulp allows you to automate parts of the development process to make your job easier as a developer. While Gulp is a complicated tool with lots of optionality, there are some basic components/ automations that are useful for most react applications.

Here is a breakdown of the different tasks that Gulp might perform in the development and production stages (courtesy of Tyler McGinnis – see a link to one of his very informative articles below).

### Gulp for Development:
    * Transform our JSX into JS and save the output into a dist/src folder.
    * Copy our index.html from our src folder into the dist folder
    * Watch for changes to any JS or HTML file then run the previous two processes again.

### Production:
    * Take all the JS files and concat them all together, then minify the result
    * Output that into one file named `build.js`  inside the `build/` folder
    * Replace the `<script>` tags in our `index.html` page with one `<script>` which references our new minified build.js file
  

In your terminal, head over to the root of this project then type `npm init` and continue hitting enter until the prompts finish:

`npm install --save-dev gulp`
`npm install --save-dev gulp-concat`
`npm install --save-dev gulp-uglify;`
`npm install --save-dev gulp-react;`
`npm install --save-dev gulp-html-replace;`

All we did was tell npm to go and download each of those packages and save them into our node_modules folder (which was created for us) and add them to our package.json file as a developer dependency

Now if you check out the node_modules folder, it should be full of the packages above. What we can do now is in our `gulpfile.js` file, we can use require to essentially import the code from each of the different packages and save that functionality into a variable. Let’s do that right now.

In the top of your gulpfile.js file, add the following code.

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

npm install --save-dev vinyl-source-stream;
npm install --save-dev browserify;
npm install --save-dev watchify;
npm install --save-dev reactify;
npm install --save-dev gulp-streamify;

We have included this 5 in our base configuration and have outlined their usage below:

    var gulp = require('gulp');
    var uglify = require('gulp-uglify');
    var htmlreplace = require('gulp-html-replace');
    var source = require('vinyl-source-stream');
    var browserify = require('browserify');
    var watchify = require('watchify');
    var reactify = require('reactify');
    var streamify = require('gulp-streamify');

    var path = {
      HTML: 'src/index.html',
      MINIFIED_OUT: 'build.min.js',
      OUT: 'build.js',
      DEST: 'dist',
      DEST_BUILD: 'dist/build',
      DEST_SRC: 'dist/src',
      ENTRY_POINT: './src/js/App.js'
    };

_Browserify_:
Allows you to use require like you would in a node project

_Babelify_: Will compile ES6 and JSX into code that will run on all browsers

_Uglify_: Minify files to make fast fast loading 

Vinyl Source Stream

_Watchify_: 

Will only work on the changes you have made


For example, if you are writing a

For example, if you have a



if you have a large CSS file, you want to minify it before going into production, so that your code runs faster in production. Minifying a file means that you put all the code on one line and then remove all the comments and white spaces. This is a very tedious process that can be automated. Futhermore, if you minify your code and then decide to change something, it is ver difficult to edit a minified file. Gulp will automatically minify your files  

Useful Links (some very helpful sites):

1.	http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/
2.	https://css-tricks.com/gulp-for-beginners/
3.	http://www.sitepoint.com/introduction-gulp-js/
