# Project Description
## SE2Project - The Hair Thing
A hair care web application for finding hair products and styles that would help in growth and overall hair care,
as well as creation of a personal scheduler based on user-captured data

This project is part of a Computer Science course at the U.W.I and is currently in progress by:
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

# Prerequisites
## Local Machine Development - Windows OS
### Environment
1. nodemon - install in working directory or on entire system
npm install -g nodemon

2. Dependencies if node_modules folder is absent or empty
npm -i express cors path jsonwebtoken bcrypt sequelize dotenv pg pg-hstore

#### For dotenv
Create a file .env and save JWT key e.g. jwtSecret = 123
Access the key using: process.env.jwtSecret

# Start Express 
nodemon index.js

# Start React
cd client //change directory to client folder
If the node_modules folder in client folder is empty then enter command: npm install

npm start

# TO DEPLOY YO HEROKU
cd client //change directory to the client folter
npm build //prepares the react for deployment

Push to GitHub main branch: //do this in whichever way you want
heroku login
heroku create
git push heroku master
heroku open
