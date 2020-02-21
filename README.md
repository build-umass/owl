# Owl Auth
Authorization team for the BUILD Internal House Project. Our goal is to link the front end with the backend database for user login authentification and authorization. Owl will feature multiple levels of users with different permissions, along with SSO with Google for the smoothest process possible. Techstack of Node.js and Passport.js.


## Setup
For this project you will need to install [Node.js](https://nodejs.org/en/download/). This will come with the capability to use Node.js to host a server, and with npm (node package manager). This will allow you to download all the required dependencies all at once in the correct folder, instead of one by one. To use, in your appropiate command prompt navigate to the folder you cloned the repo (C:\pathname\owl). To install the dependencies, run the below command.

```
npm install
```

This should install all the required dependencies for Owl. If you receive and error similar to `'npm' is not recognized as an internal or external command, operable program or batch file.` then run the `node` command first and try again. Finally, to run the hello world program, use one of the below commands. Dev runs in development mode, and start runs it normally.

```
npm run dev
```

```
npm run start
```

A 'Hello world!' message will be displayed on the command prompt and on the website hosted at http://localhost:3000
