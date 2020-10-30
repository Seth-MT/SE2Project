# SE2Project
Software Engineering 2 Project

Using a PERN Stack
P - PostgreSQL
E - Express
R - React
N - Nodejs

#  LOCAL MACHINE DEV
Start by installing nodemon globally on your system so changes can be seen on the website without having to stop and restart the server. Similar to Debug=True with flask
npm install -g nodemon

Next
If the node_modules folder is empty in the root folder then
npm -i express cors path jsonwebtoken bcrypt sequelize dotenv pg pg-hstore


dotenv allows us to use secret keys and not upload them to github:

create a file called .env and put your keys in there e.g jwtSecret = 123

access the keys in .env using process.env.jwtSecret as seen in utils/jwtGenerator.js

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
