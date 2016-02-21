# Chugg Documentation

Welcome to Chugg, a tool that automates the creation of gulpfiles for react projects. This documentation is targeted for users who are learning to code and want to understand exactly what Gulp does and how to read the gulpfiles we are generating. We also cover all of the features that we are including in our files.

# Getting Started with Gulp

First, you need to download node, assuming you do not have it on your computer already. To see if you already have it installed, type `node –v` on your terminal. Once node is installed on your machine, open your terminal and type in the following command to install Gulp globally: `npm install –g gulp` *(you need to do this before you can use it in your project folder)*.
After installing Gulp, you want to create your React project folder (if you have not already done so), into which you will insert the gulpfile that we have generated for you.

# What is Gulp

If you Google, “What is Gulp?” you get this answer: “Gulp is a task/build runner for development. It allows you to do a lot of stuff within your development workflow. You can compile sass files, uglify and compress js files and much more. The kicker for gulp is that its a streaming build system which doesn't write temp files.”
<<<<<<< HEAD
=======

>>>>>>> master
That answer can be a bit confusing for new coders... In layman’s terms, Gulp allows you to automate parts of the development process to make your job easier. Here is a breakdown of the different tasks that Gulp might perform for a react project in the development and production stages (courtesy of Tyler McGinnis – see a link to his informative articles below).

### Gulp for Development:
    * Transform our JSX into JS and save the output into a dist/src folder.
    * Copy our index.html from our src folder into the dist folder
    * Watch for changes to any JS or HTML file then run the previous two processes again.

### Production:
    * Take all the JS files and concat them all together, then minify the result
    * Output that into one file named `build.js`  inside the `build/` folder
    * Replace the `<script>` tags in our `index.html` page with one `<script>` which references our new minified build.js file
For the next step, we are going to create our `package.json` file which is an essential component of your application. You can insert our `package.json` folder into your project and just type in `npm install` into the command terminal.

<<<<<<< HEAD
Here is a desctiption of the various NPM Packages we have included in our project:
=======

In your terminal, head over to the root of this project then type `npm init` and continue hitting enter until the prompts finish. Then you have one of 2 options. First, you can use our `package.json` and just type in `npm install`. Alternatively, you can go to your terminal and type in the following commands into your prompt:

\\ next group, please make sure this documentation is 100% correct (not just this section, but everything) - just rushing through now!
`npm install --save-dev vinyl-source-stream;`
`npm install --save-dev browserify;`
`npm install --save-dev watchify;`
`npm install --save-dev reactify;`
`npm install --save-dev gulp-streamify;`
`npm install --save-dev babelify;`
`npm install --save-dev gulp-nodemon;`
`npm install --save-dev minifycss;`
`npm install --save-dev babelify;`
-might need one or two more here (Google closure compiler);


All we did here was tell npm to go and download each of those packages and save them into our node_modules folder (which was created for us automatically) and add them to our package.json file as a developer dependency. Now if you check out the node_modules folder, it should be full of the packages above.

Finally, when you are ready to start coding, we have included nodemon in our gulpfile and added a script to our package.json which allows you to type in `gulp` into the terminal and have your nodemon server up and running.

Desctiption of included NPM Packages:
>>>>>>> master

[__Browserify__](https://www.npmjs.com/package/browserify "Browserify"):
Allows you to use `require` like you would in a node project

[__Babelify__](https://www.npmjs.com/package/babelify "Babelify"): Will compile ES6 and JSX into code that will run on all browsers

[__Vinyl Source Stream__](https://www.npmjs.com/package/vinyl-source-stream "Vinyl Source Stream"): When you land in a foreign country you need to exchange the cash in your pocket for an equal amount of cash used in that country. Otherwise you can't buy souveniers! Vinyl Source Stream is the currency exchange kiosk for your data. Data that is piped through a Browserify task is outputted as a text stream. Vinyl Source Stream converts that data into a virtual stream that gulp expects, which allows the data to be piped into additional gulp tasks.

[__Watchify__](https://github.com/substack/watchify#readme): Will operate on the changes you have made, rather than operating on the entire file every time. Greatly improves speed of task running.

<<<<<<< HEAD
[__Nodemon__](https://www.npmjs.com/package/gulp-nodemon): Allows you to run your server by typing `gulp` in the terminal when you are ready to start coding. Nodemon is a fancy node server plug-in which makes it so that you don't have to re-start your server every time you change your code.

[__CSS Nano__](https://www.npmjs.com/package/gulp-minify-css): Minify's your CSS (all on one line with no comments or spaces for optimal performance!)

[__Gulp Closure Compiler__](https://www.npmjs.com/package/gulp-closure-compiler): Simple optimizations for classic minifying.
(Next group, please add to this documentation with all the packages and any others that you create)

### Some things to consider before starting
    * If you chose to add some of the optional tasks like 'CSS Nano' or 'Google Closure Compiler', be sure to add those scripts to the `gulp.default()` code on your downloaded gulpfile. (next group, pay attention here)
    * We're assuming your project has a typical directory structure, but if you have a unique set of directories you'll need to change the names in your gulpfile to match those in your project folder.
=======
(Next group, please add to this documentation with all the packages and any others that you create)

### Some things to consider before starting
    * If you chose to add some of the optional tasks like 'MinifyCSS' or 'Google Closure Compiler', be sure to add those scripts to the `gulp.default()` code on your downloaded gulpfile.
    * We're assuming your project has a typical directory structure, but if you have a unique set of directories you'll need to change the names in your gulpfile to match those in your project folder. 
>>>>>>> master

### Further Reading
Here are some links to very helpful articles on gulp and customizing your tasks:
    	* [Building React Applications with Gulp and Browserify](http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/ "Building React Applications with Gulp and Browserify, Tyler McGinnis")
      * [Gulp For Beginners](https://css-tricks.com/gulp-for-beginners/ "Gulp for Beginners, CSS-Tricks")
      * [Introduction to Gulp](http://www.sitepoint.com/introduction-gulp-js/ "Introduction to Gulp, SitePoint");
      * [The Gulp Docs](https://github.com/gulpjs/gulp/tree/master/docs "Gulp Docs")
