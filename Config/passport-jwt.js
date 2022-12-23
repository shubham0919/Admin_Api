const passport = require('passport');

const passportJWT = require('passport-jwt');

const Strategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;

let obj = {};

obj.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
obj.secretOrKey = 'jenish';

passport.use(new Strategy(obj,(data,done) => {

    if(data)
    {
        return done(null,data);
    }
    else
    {
        return done(null,false);
    }

}))