//Imports
const express = require('express');
//Change express session to JWT
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

//Initialize passport and express
const app = express();
app.use(session({
	secret: 'JdnYcUsmLdBld',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Handle post request on login
app.post('/auth', function(request, response) {
	const username = request.body.username;
	const password = request.body.password;
	if (username && password) {
        //This should eventually be changed to use JWT
        request.session.loggedin = true;
        request.session.username = username;
        //Do something with password
        response.redirect('/home')
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//Handle get request after login
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

//Start server
const server = app.listen(3000);

//Output test
console.log("Server running on port 3000...")
console.log("Hello world!")