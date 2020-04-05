//Imports
const express = require('express');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

//Initialize passport and express
const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const userDict = {}

//Handle post request on login
app.post('/login', (request, response) => {
	const user = {
		username: request.body.username,
		password: request.body.password
	}
	//Auth stuff should go here, obviously password shouldn't be stored in this way but this is just testing purposes for now
	jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (error, token) => {
		if(error){
			response.json({
				message: 'JWT failed to authenticate. Please try again.'
			});
		} else {
			response.json({
				token
			});
		}
	});
	console.log(request.headers)
	if (userDict[user.username] === user.password) {
        response.redirect('/home');
	} else {
		response.send('Incorrect username or password.');
		response.end();
	}
});

//Handle get request after login
app.get('/home', verifyToken, (request, response) => {
	jwt.verify(request.token, 'secretkey', (error, authData) => {
		if(error){
			response.send('Please login to view this page!');
		}
		else {
			response.json({
				message: "Welcome back, " + authData.user + '!'
			})
		}		
	});
	response.end();
});

app.post('/api/posts', verifyToken, (request, response) => {
	jwt.verify(request.token, 'secretkey', (error, authData) => {
		if(error){
			response.sendStatus(403);
		}
		else {
			response.json({
				message: "Success!",
				authData
			})
		}		
	});
	response.end();
});


//Handle post request on signup
app.post('/signup', (request, response) => {
	const username = request.body.username;
	const password = request.body.password;
	if(username in userDict){
		response.send("This username is already taken.");
		response.end();
	}else{
		userDict[username] = password;
		response.redirect('/index.html');
		response.end();
	}
});

//JWT token verification
function verifyToken(request, response, next) {
	const header = request.headers['authorization'];
	if(typeof header !== 'undefined'){
		const bearer = header.split(' ');
		const bearerToken = bearer[1];
		request.token = bearerToken;
		next();
	} else {
		//Forbidden response code
		response.sendStatus(403);
	}
}


//Start server
const server = app.listen(3000, () => console.log("Server running on port 3000..."));

//Output test
console.log("Hello world!")