Assignment 3 - Filters
===


Assignment details
---

Do the following to complete this assignment:

1. Clone the [starting project code](https://github.com/cs4241-16b/A3-Filters). **DO NOT FORK THE REPO and DO NOT MAKE IT PUBLIC.** This repo contains:
    * the server code, `server.js`
    * the `Procfile` that you need for Heroku deployment
    * A starting `index.html` file that you will edit as described below
    * A blank `style.css` file that you will use to style your own content
2. The goal of this project is to set up basic filter functionality. You will need a list and a place for user input to place a filter on that list. You will also need to have the functionality to send the URL to someone else and have the website display the same filter as the one you just had in place. For example:
	* You have the list of movies:
		* Jaws
		* Jaws 2
		* Jaws 3
		* Space Jame
		* Big Fish
		* The Illusionist
	* When the use inputs "Jaws" the list becomes:
		* Jaws
		* Jaws 2
		* Jaws 3
	* Hint: Your URL would look something like www.______.com/search?search=jaws
3. Deploy your project to Heroku.
	* Ensure that your project has the proper naming scheme (`cs4241-a3-yourGitHubUsername`) so we can find it.
4. The project will be graded against the following rubric (120 total):
	* 100: Fulfilling the requirements above
	* 10: Good theming and layout
	* 10: Technical Achievement: Have fun here! Check out advanced resources for some ideas. Don't forget to include an explanation of your achievement on your page.


Resources
---

A good resource for general HTML/CSS/Javascript is the [Mozilla Developer Network](https://developer.mozilla.org/en-US/). This contains all the references you need for front-end design.

A good resource for font is the [Google Fonts](https://fonts.google.com/) project, with hundreds of different fonts to choose from so that you don't have to stick with Comic Sans. Or Impact.

If you want icons, look into [Font Awesome](http://fontawesome.io/).

Advanced Resources
---
*Note that none of these are required for a good assignment, but it's generally a good idea to master a couple of frameworks if you are interested in developing web application in a real environment. As always, you should master the basics first before moving on to other parts*

[API Example] (https://www.npmjs.com/package/imdb-api) : It's possible to query databases and sites using API. Even GitHub provides its own API. Check out this example that queries movie and television data. Something similar could be used to build a list, and even filter it!

[Bootstrap](http://getbootstrap.com/) is a popular front-end framework for building responsive web pages and in general makes your life easier. 

[UIKit](https://getuikit.com/) is another alternative to Bootstrap that you could look into. It is lighter than Bootstrap __and__ supports animation, if that's what you are into. 

[Sass](http://sass-lang.com/) is an extension to CSS that makes maintaining/writing CSS easier and more fun. You basically write in Sass, and the complier will output a CSS file to use in production. 
