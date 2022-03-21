const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

const User = mongoose.model('Users', {
    username: String,
    password: String,
    name: String
})

//Para iniciar sesion
passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({username}, (err, user) => {
            if(err) done(err)

            if(!user) {
                console.log('User not found with username '+ username)
                return done(null, false)
            }

            return done(null,user)
        })
    }
))