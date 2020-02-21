# Owl Auth
Authorization team for the BUILD Internal House Project. Our goal is to link the front end with the backend database for user login authentification and authorization. Owl will feature multiple levels of users with different permissions, along with SSO with Google for the smoothest process possible. Techstack of Node.js and Passport.js.


## Setup
For this project you will need to install [Node.js](https://nodejs.org/en/download/). This will come with the capability to use Node.js to host a server, and with npm (node package manager). This will allow you to download all the required dependencies all at once in the correct folder, instead of one by one. To use, in your appropiate command prompt navigate to the folder you cloned the repo (C:\pathname\owl). Then, run what is below.

```
npm init
```

This should initialize npm. If you receive and error similar to `'npm' is not recognized as an internal or external command, operable program or batch file.` then run the `node` command first and try again. To install the dependencies, run the below command.

```
npm install
```

This should install all the required dependencies for Owl. Finally, to run the hello world program, use the below command.

```
node server.js
```

A 'Hello world!' message will be displayed on the command prompt and on the website hosted at <localhost:3000>.
