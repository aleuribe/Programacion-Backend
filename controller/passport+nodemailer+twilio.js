//Imports de entrega  3
import passport from 'passport'
import twilio from 'twilio'
import {createTransport} from 'nodemailer'

import {Strategy as LocalStrategy} from 'passport-local'
import mongoose from 'mongoose'
import bCrypt from 'bcrypt'

//Login/Logout con local passport

const User = mongoose.model('Users', {
    username: String,
    password: String,
    name: String,
    address: String,
    age: Number,
    phone: String
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

            if(!isValidPassword(user,password)) {
                console.log('Invalid password')
                return done(null, false)
            }

            return done(null,user)
        })
    }
))

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
}


//Para crear el usuario
passport.use('signup', new LocalStrategy(
    {passReqToCallback:true}, 
    (req, username, password, done) => {
        User.findOne({'username':username}, (err, user) => {
            if(err) {
                console.log("Error signup "+err)
                return done(err)
            }

            if(user){
                console.log("User already exists")
                return done(null, false)
            }

            const newUser = {
                username,
                password:createHash(password), 
                name: req.body.nombre,
                address: req.body.direccion,
                age: req.body.edad,
                phone: req.body.tel}

            User.create(newUser, (err, userWithId) => {
                if(err) {
                    console.log("Error saving user" + err)
                    return done(err)
                }
                console.log(userWithId)
                
                sendEmail(userWithId, "nuevo registro")

                return done(null, userWithId)
            })
        })
}))

function createHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null)
}

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id,done)
})

//Nodemailer

const TEST_MAIL = 'frederic.mills76@ethereal.email'

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREALUSER,
        pass: process.env.ETHEREALPASS
    }
});

function sendEmail(params, title) {
    //Preparamos el mail
    const mailOptions = {
        from: 'Servidor eCommerce v1.0',
        to: TEST_MAIL,
        subject: title,
        html: JSON.stringify(params)
    }
    //Enviamos el mail
    transporter.sendMail(mailOptions)
        .then(r => console.log(r))
        .catch(e => console.log('error', e))
}

//Twilio
const accountSid = process.env.ACCOUNTSID
const authToken = process.env.AUTHTOKEN

const client = twilio(accountSid, authToken)

function sendWhatsapp(params) {
    client.messages.create({
        body: JSON.stringify(params),
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491127490912'
    })
        .then(r => console.log(r))
        .catch(e=>console.log('error', e))
}


export { passport, sendWhatsapp, sendEmail}