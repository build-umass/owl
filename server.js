//Imports
const express = require('express');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');

//Initialize passport and express
const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const userDict = {}

app.get('/home', verifyToken, (req, res) => {
    res.send('Welcome back ' + res.user.username + '!');
});

app.post('/login', (req, res) =>{
    const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const user = {
        username: req.body.username,
		password: req.body.password
    }

    // not sure if we still have username or if it's changing to email
    User.findOne({ email }).then(user => {
        if(!user) {
            errors.email = 'User not found';
            return res.status(404).json({email: 'User not found'});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                const payload = {
                    // for when we add an id
                    // id: user.id
                    name: user.name
                };
                jwt.sign({user:user}, 'secretkey', {expiresIn: '30m' }, (err,token) => {
                    res.json({
                        token: token
                    })
                });
            } else {
                errors.password = 'Password Incorrect';
                return res.status(400).json(errors);
            }
        })
    })
    //Usually we wouldn't store the users password like this, and instead first compare if the password matches then create the user with perhaps id, email, username
        //Not sure what to do after login yet, redirecting to home discard the JWT information. Front end would have to store the JWT and we would retrieve it I believe
        //res.redirect('/home')
	
});

app.post('/signup', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	//Password should be hashed as they signup, not stored like above
	if(username in userDict){
		res.send("This username is already taken.");
	}else{
		userDict[username] = password;
		res.redirect('/index.html');
	}
});


function verifyToken(req, res, next) {
    console.log(req.headers)
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined'){
        token = header.split(' ')[1];
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err){
                console.log(err);
                res.sendStatus(403);
            } else {
                res.user = authData.user
                // res.json({
                //     message: 'Post created',
                //     authData: authData
                // });
            }
        });
        next();
    } else {
        res.sendStatus(403);
    }
}

//Start server
const server = app.listen(3000, () => console.log("Server running on port 3000..."));

//Output test
console.log("Hello world!")

