/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

// adding Mongoose
const config = require('./config');

// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();

// Makes server accessable from client
app.use(function(req, res, next) {
    console.log(JSON.stringify(req.headers));
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-type, Authorization');
    next();
});

app.use(express.static('./server/static'));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authentication checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
