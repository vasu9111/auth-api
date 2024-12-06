# auth-api

# server

> Auth Api build with express.js

# Getting Started

- Node.js
- npm (Node Package Manager)
- Postman (for API testing)
- mongodb

# Install the required dependencies.

npm i express mongoos nodemon jsonwebtoken joi express-session cookie-parser dotenv-safe cors

# Update the scripts section in env package.json for development:

"scripts": {
"start": "nodemon server.js"
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
      registration Login user with different validation methods.
      **Method: POST**
      **URL:**
      - `/api/auth/registration/custom-validation`
      - `/api/auth/registration/joi-validation`
      - `/api/auth/registration/db-validation`

---

- 2.  login page :-
      Login user with different validation methods.
      **Method: POST**
      **URL:**
      - `/api/auth/login/custom-validation`
      - `/api/auth/login/joi-validation`

---

- 3.  logout :-
      Logout user
      **Method: POST**
      **URL:**
      - `api/auth/logout`

---

- 4.  Private route:-
      Access corent user exist check
      **Method: GET**
      **URL:**
      - `/api/page/private`

---

- 5.  renew access token :-
      Refresh token to access token renew
      **Method: POST**
      **URL:**
      - `/api/auth/refresh`
