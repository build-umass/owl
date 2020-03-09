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

const userDict = {}

//Handle post request on login
app.post('/login', function(request, response) {
	const username = request.body.username;
	const password = request.body.password;
	if (userDict[username] === password) {
		
        //This should eventually be changed to use JWT
        request.session.loggedin = true;
        request.session.username = username;
        //Do something with password
        response.redirect('/home')
	} else {
		response.send('Incorrect username or password.');
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

//Handle post request on signup
app.post('/signup', function(request, response){
	const username = request.body.username;
	const password = request.body.password;

	if(username in userDict){
		response.send("This username is already taken.");
		response.end();
	}else{
		userDict[username] = password;
		response.redirect('/login')
	}
});
//Start server
const server = app.listen(3000);

//Output test
console.log("Server running on port 3000...")
console.log("Hello world!")