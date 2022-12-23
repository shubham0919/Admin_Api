const express = require('express');

const db = require('./Config/mongoose');

const admin = require('./Models/adminschema');

const app = express();

const port = 9050;

const passport = require('passport');

const passportJWT = require('./Config/passport-jwt');

const cookie = require('cookie-parser');

const session = require('express-session');

app.use(session({
    secret : 'jenish',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000*60
    }
}))

app.use(passport.initialize());

app.use(cookie());

const path = require('path');

app.use('/Assets',express.static(path.join('Assets')));

app.use(express.urlencoded());

app.use('/',require('./routes/index'));

app.listen(port,(err) => {
    if(err)
    {
        console.log('Server not Start');
        return false
    }
    console.log(`Server Start on http://localhost:${port}`);
})