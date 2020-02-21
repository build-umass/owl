const express = require('express');
const passport = require('passport');

var app = express();
app.use(passport.initialize());
app.use(passport.session());
var server = app.listen(3000);

console.log("Server running on port 3000...")
console.log("Hello world!")