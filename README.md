# Chugg Documentation

Welcome to Chugg, a tool that automates the creation of gulpfiles. When you download a gulpfile from us you will get a gulpfile, a corresponding package.json file, and some docs that will teach you how to use gulp properly. To get started clone the repo and run these two commands:

`npm install`

`npm start`

### What can you do with Chugg?

![The Demo](http://g.recordit.co/gTKK7uMIld.gif)

Chugg will generate a gulpfile for a wide variety of project types based on the frameworks you are using. Right now, we support react, Angular, and basic JavaScript projects. We are looking to add more. You can add your directory details and install your generated gulpfile.


# Getting Started with Gulp

First, you need to download node, assuming you do not have it on your computer already. To see if you already have it installed, type `node –v` on your terminal. Once node is installed on your machine, open your terminal and type in the following command to install Gulp globally: `npm install –g gulp` *(you need to do this before you can use it in your project folder)*.
After installing Gulp, you want to create your React project folder (if you have not already done so), into which you will insert the gulpfile that we have generated for you.

# What is Gulp

If you Google, “What is Gulp?” you get this answer: “Gulp is a task/build runner for development. It allows you to do a lot of stuff within your development workflow. You can compile sass files, uglify and compress js files and much more. The kicker for gulp is that its a streaming build system which doesn't write temp files.”

### Gulp for Development:
		* Transform our JSX into JS and save the output into a dist/src folder.
		* Copy our index.html from our src folder into the dist folder
		* Watch for changes to any JS or HTML file then run the previous two processes again.

### Production:
		* Take all the JS files and concat them all together, then minify the result
		* Output that into one file named `build.js`  inside the `build/` folder
		* Replace the `<script>` tags in our `index.html` page with one `<script>` which references our new minified build.js file
For the next step, we are going to create our `package.json` file which is an essential component of your application. You can insert our `package.json` folder into your project and just type in `npm install` into the command terminal.

### Some things to consider before starting
		* If you chose to add some of the optional tasks like 'CSS Nano' or 'Google Closure Compiler', be sure to add those scripts to the `gulp.default()` code on your downloaded gulpfile. (next group, pay attention here)
		* We're assuming your project has a typical directory structure, but if you have a unique set of directories you'll need to change the names in your gulpfile to match those in your project folder.

(Next group, please add to this documentation with all the packages and any others that you create)


### Further Reading
Here are some links to very helpful articles on gulp and customizing your tasks:
			* [Building React Applications with Gulp and Browserify](http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/ "Building React Applications with Gulp and Browserify, Tyler McGinnis")
			* [Gulp For Beginners](https://css-tricks.com/gulp-for-beginners/ "Gulp for Beginners, CSS-Tricks")
			* [Introduction to Gulp](http://www.sitepoint.com/introduction-gulp-js/ "Introduction to Gulp, SitePoint");
			* [The Gulp Docs](https://github.com/gulpjs/gulp/tree/master/docs "Gulp Docs")
