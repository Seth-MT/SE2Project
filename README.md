# SE2Project
Software Engineering 2 Project

Using a PERN Stack
P - PostgreSQL
E - Express
R - React
N - Nodejs

# HEROKU DEV
Modify package.json file
    "scripts": {
        "start": "node server.js"
    }

Create or modify Procfile with
    web: npm run start

# TO DEPLOY YO HEROKU
heroku login
heroku create
git push heroku master
heroku open

# LOCAL MACHINE DEV
Modify package.json file
    "scripts": {
        "server": "nodemon server.js"
    }

# Express 
npm start (server)

# React
npm run start
