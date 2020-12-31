require('dotenv').config()

const port = process.env.PORT || 3000;

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

//Models
const usersModel = require('./models/user.model');

//This function will allow us to retrict the access to the routes
global.secure = function(type) {
	return function (request, response, next) {
		if (request.isAuthenticated()) {
			if (type) {
				if (type === request.user.type) {
					return next();
				}else{
					response.redirect('/');
				}
			}else{
				return next();
			}			
		}
		response.redirect('/');
	}
};

app.use(validator());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
	secret: 'someRandomSecretKey',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(username, callback) {
	callback(null, username);
});

passport.deserializeUser(function(username, callback) {
	usersModel.read(username, function(data) {
		callback(null, data);
	})
});

app.set('view engine', 'ejs');
app.set('views','views');

global.connection = mysql.createConnection({
	host     : process.env.DB_HOST,
	user     : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_SCHEMA,
}).on('enqueue', function (sequence) {
	if ('Query' === sequence.constructor.name) {
		console.log(sequence.sql);
	}
});

app.listen(port, function(){
	console.log('Server started at: ' + port);
});

//Midleware that sets the isAuthenticated variable in all views
app.use(function(request, response, next){
	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});

//Assets
app.use('/public', express.static('assets'));

//Routes
app.use('/', require('./controllers/index.route'));
app.use('/users', require('./controllers/user.route'));
app.use('/login', require('./controllers/login.route'));
app.use('/logout', require('./controllers/logout.route'));
app.use('/profile', require('./controllers/profile.route'));