# ski-scraper
nordic skiing news scraper

## built using MERN stack

This app was built using the MERN stack, and it functions as a web scraper for nordic skiing related news. 

- The actual scraping happens on the backend using axios. 
- the results of the scrape are saved to a MongoDB collection
- the collection is queried to populate the page using React
- the api to query the database is built using express

## How it works

### Model

MongoDB is used to store articles, saved articles as well as comments. Mongoose ODM was used to make this a bit easier. Two collections: Articles and Comments were utilized with the mongoose populate() method for creating a "join" to display comments to the page.

Anybody can add, or delete comments on a saved article. The comments can be viewed on the saved page. 

### Views

React builds the front-end using the react-router-dom npm package to control front-end routing for this single page app. There are two pages: Main and Saved.  Most of the methods are passed from the App component to child components through props. This made it easier to keep as few components stateful as possible. 

### Controller

The API routes are all handled using express.js and the initial scrape is handled via axios and cheerio dependencies. 

## Deploy info

this app is deployed using heroku and is hosted at: https://wax-scraper.herokuapp.com/ 

## How to run on your machine

1. clone this repo
2. cd into repo directory and run ```npm i && cd client && npm i``` in your terminal/bash
3. run ```npm start``` and away you go!

## future improvements

- guest login for comments (you can only delete your own comments)
- pulling multiple news sites (including those in norwegian w/ google translate API call for translation)
- animate button clicks and page routing!
