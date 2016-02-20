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

Now if you check out the node_modules folder, it should be full of the packages above. What we can do now is in our `gulpfile.js` file, we can use `require` to import the code from each of the different packages and save that functionality into a variable. Let’s do that right now.

In the top of your gulpfile.js file, add the following code.


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

[__Browserify__](https://www.npmjs.com/package/browserify "Browserify"):
Allows you to use require like you would in a node project

[__Babelify__](https://www.npmjs.com/package/babelify "Babelify"): Will compile ES6 and JSX into code that will run on all browsers

[__Gulp-Uglify__](https://www.npmjs.com/package/gulp-uglify "Gulp-Uglify"): Minify files to make fast fast loading

[__Vinyl Source Stream__](https://www.npmjs.com/package/vinyl-source-stream "Vinyl Source Stream"): When you land in a foreign country you need to exchange the cash in your pocket for an equal amount of cash used in that country. Otherwise you can't buy souveniers! Vinyl Source Stream is the currency exchange kiosk for your data. Data that is piped through a Browserify task is outputted as a text stream. Vinyl Source Stream converts that data into a virtual stream that gulp expects, which allows the data to be piped into additional gulp tasks.

[__Watchify__](https://github.com/substack/watchify#readme): Will operate on the changes you have made, rather than operating on the entire file every time. Greatly improves speed of task running.


### Further Reading
Here are some links to very helpful articles on gulp and customizing your tasks:

    	* [Building React Applications with Gulp and Browserify](http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/ "Building React Applications with Gulp and Browserify, Tyler McGinnis")
      * [Gulp For Beginners](https://css-tricks.com/gulp-for-beginners/ "Gulp for Beginners, CSS-Tricks")
      * [Introduction to Gulp](http://www.sitepoint.com/introduction-gulp-js/ "Introduction to Gulp, SitePoint");
      * [The Gulp Docs](https://github.com/gulpjs/gulp/tree/master/docs "Gulp Docs")
