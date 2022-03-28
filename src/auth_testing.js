import passport from 'passport'
import session from 'express-session'
import {Strategy as LocalStrategy} from 'passport-local'
import mongoose from 'mongoose'
import bCrypt from 'bcrypt'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//to quitar

// import express from 'express'

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
        console.log(username)
        console.log(password)
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

const app = express()

app.use(express.static(__dirname + '../../public/'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:'ale1234',
    resave: false,
    saveUninitialized:false,
    cookie: {
        maxAge:30000
    }
}))

//Inicializamos el passport
app.use(passport.initialize())
app.use(passport.session())

///RUTAS

app.get('/', (req,res) => {
    res.send("Hola index")
})

app.get('/login', (req, res) => {
    if(req.isAuthenticated()) {
        var user = req.user
        console.log("Usuario logueado")
        
        res.send('login-ok')
    }else{

        res.redirect('/login.html')
    }
})

app.post('/login', passport.authenticate('login'), (req, res) => {

    res.redirect('index.html')
})

app.get('/register', (req, res) => {
    res.redirect('register.html')
})


app.post('/register', passport.authenticate('signup'), (req, res) => {

    res.redirect('login.html')
})

///END RUTAs


function checkAuth(req, res, next) {
    if(req.isAuthenticated()) next()
    else res.redirect('/login')
}

app.get('/private-route', checkAuth, (req, res) => {
    const { user } = req
    res.send("<h1>Ruta OK!!</h1>")
})

function conectarDB(url, cb){
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if(cb != null) {
            cb(err)
        }
    })
}

conectarDB('mongodb+srv://user:user123@cluster0.n3sme.mongodb.net/clase25', err => {
    if(err) return console.log("error connct db")

    app.listen(8080, () => {
        console.log('tou cuchando')
    })
})
