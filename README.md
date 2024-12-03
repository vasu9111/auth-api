# auth-api

# server

> REST APIs build with express.js

# Getting Started

- Node.js
- npm (Node Package Manager)
- Postman (for API testing)
- mongodb

# Install the required dependencies.

npm i express

# Update the scripts section in env package.json for development:

"scripts": {
"start": "nodemon --env-file=.env server.js"
},

# Running the Project

`npm start`

# start the server

Run `http://localhost:4000/` in postman in postman

# API Documentation :-

# Base URL :-

`http://localhost:4000/`

# Endpoints :-

- 1.  Registration page:-
      Method: POST
      URL: '/api/registration/custom-validation'
      URL: '/api/registration/joi-validation'

- 2.  login page :-
      Method: POST
      URL: '/api/login/custom-validation'
      URL: '/api/login/joi-validation'

- 3.  logout :-
      Method: GET
      URL: 'api/logout'

- 4.  Private route:-
      Method: GET
      URL: '/api/private'

- 5.  renew access token :-
      Method: POST
      URL: '/api/refresh'
