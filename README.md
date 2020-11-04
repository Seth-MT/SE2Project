# Project Description
## SE2Project - The Hair Thing
A hair care web application for finding hair products and styles that would help in growth and overall hair care,
as well as creation of a personal scheduler based on user-captured data

This project is part of a Computer Science course at the University of the West Indies and is currently in progress by:
Seth Timothy (Me)
Matthew Christian
Christopher Joseph
Dexter Singh

The application is made based on a PERN Stack architecture
P - PostgreSQL
E - Express
R - React
N - Nodejs

And deployed on Heroku
https://thehairthing.herokuapp.com/


# Pre-requisites
## Local Machine Development - Windows OS
### Environment Dependencies
1. nodemon 
2. express
3. cors
4. jsonwebtoken
5. bccrypt
6. sequelize
7. dotenv
8. pg
9. pg-hstore


# Installation / Setup
1. nodemon
npm install -g nodemon

In package.json file, change
"scripts": {
    "start": "node index.js"
}

To

"scripts": {
    "start": "nodemon index.js"
}

For local host development, and vice-versa for deployment.

2. To install the other dependencies:
npm -i express cors path jsonwebtoken bcrypt sequelize dotenv pg pg-hstore

#### For dotenv
Create a file .env and save the JWT key in it e.g. jwtSecret = 123
Access the key using: process.env.jwtSecret

## Run Local
### To Start Express
Navigate to root folder or where index.js is located (default)
nodemon index.js or node index.js

### To Start React
Navigate to client (react) folder
cd client
npm start

## Deploy to Heroku
cd client //change directory to the client folter
npm build //prepares the react for deployment

Push to GitHub main branch: //do this in whichever way you want
heroku login
heroku create
git push heroku master
heroku open