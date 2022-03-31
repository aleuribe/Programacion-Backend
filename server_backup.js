import express from 'express'
import routes from '../routes/routes.js'

import {
    productosDao as products,
    carritosDao as cart
} from './constructor/index.js'

//Imports de entrega  3
import passport from 'passport'
import session from 'express-session'
import {Strategy as LocalStrategy} from 'passport-local'
import mongoose from 'mongoose'
import bCrypt from 'bcrypt'


const { Router } = express

const app = express()

const ISADMIN = true

const errorProductoSinStock = {'error':'producto sin stock'}
const errorProductoNoExiste = {'error':'producto no existe'}

//Router base /api/productos
const routerProduct = Router()

//Funcionalidad a: GET /:id --> Devuelve un producto segun su ID || para users y admins
routerProduct.get("/:id", checkAuth, (req, res) => {
    let id = req.params.id
    return res.json(products.find(id))
})

routerProduct.get("/", (req, res) => {
    return res.json(products.list)
})

//Funcionalidad b: POST / --> Incorpora productos al listado || solo admins
routerProduct.post("/", mwAdmin, checkAuth, (req, res) => {
    let obj = req.body
    let post = products.insert(obj)
    products.write()
    return res.json(post)
})

//Funcionalidad c: PUT /:id --> Actualiza un producto segun su id || solo admins
routerProduct.put("/:id", mwAdmin, checkAuth, (req, res) => {
    let obj = req.body
    let id = req.params.id
    let put = res.json(products.update(id,obj))
    products.write()
    return put
})

//Funcionalidad d: Borra un producto segun su ID || solo admins
routerProduct.delete("/:id", mwAdmin, checkAuth, (req,res) => {
    let id = req.params.id
    let deleted = res.json(products.delete(id))
    products.write()
    return(deleted)
})


//Router base /api/carrito
const routerCart = Router()
//Funcionalidad extra: GET / --> obtiene el listado de carritos || usuarios y admins
routerCart.get("/", (req, res) => {

    return res.json(cart.list)
})

//Funcionalidad a: POST / --> Crea un carrito y devuelve su id || usuarios y admins
routerCart.post("/", checkAuth , (req, res) => {
    let obj = req.body
    let create = cart.cartCreate()
    if(create>0) {
        cart.write()
    }
    return res.json(create)
})

//Funcionalidad b: DELETE /:id --> Vacia un carrito y lo elimina || usuarios y admins
routerCart.delete("/:id", checkAuth , (req,res) => {
    let id = req.params.id
    let deleted = cart.cartDrop(id)

    if (deleted.error == undefined) {
        cart.write()
    }

    return(res.json(deleted))
})

//Funcionalidad c: GET /:id/productos --> Permite listar todos los productos del carrito || usuarios y admins
routerCart.get("/:id/productos", checkAuth, (req, res) => {
    let id = req.params.id
    let listaProductos = cart.find(id)
    
    if(!listaProductos.productos) {
        return res.json(listaProductos)
    }
    
    return res.json(listaProductos.productos)
    
})

//Funcionalidad d: POST: /:id/productos --> Incorpora productos al carrito por id de carrito? || usuarios y admins
routerCart.post("/:id/productos", checkAuth, (req, res) => {
    let obj = req.body
    let id = req.params.id

    //Validamos si el producto tiene stock
    const prodStock = products.find(obj.id).stock
    
    if(prodStock<=0 || prodStock < obj.cantidad) {
        return res.json(errorProductoSinStock)
    }
    
    if(prodStock==undefined){
        return res.json(errorProductoNoExiste)
    }

    let post = res.json(cart.cartInsert(id,obj))
    cart.write()
    return post
})

//Funcionalidad e: DELETE: /:id/productos/:id_prod --> Elimina un producto del carrito por su id de carrito y de producto
routerCart.delete("/:id/productos/:idprod", checkAuth, (req,res) => {
    let idCart = req.params.id
    let idProd = req.params.idprod
    let deleted = res.json(cart.cartDelete(idCart, idProd))
    cart.write()
    return(deleted)
})

//Configuracion del servidor

app.use(express.static(process.env.PWD + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', routerProduct)
app.use('/api/carrito', routerCart)

////////////////
//Proyecto entrega 3 
////////////////

//Twilio
import twilio from 'twilio'
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

//Nodemailer + Ethereal
import {createTransport} from 'nodemailer'

const TEST_MAIL = 'frederic.mills76@ethereal.email'

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREALUSER,
        pass: process.env.ETHEREALPASS
    }
});

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

app.use(session({
    secret: process.env.SECRET,
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

    res.redirect('home.html')
})

app.get('/register', (req, res) => {
    res.redirect('register.html')
})

app.post('/buyCart', (req, res) => {

    const buyCart = req.body

    const messageNewBuy = `Nuevo pedido de ${req.user.name} ${req.user.username}` 
    
    sendEmail(buyCart, messageNewBuy)
    sendWhatsapp(messageNewBuy)    

    res.send({'mensaje':'compra exitosa'})
})

app.post('/register', passport.authenticate('signup'), (req, res) => {

    res.redirect('login.html')
})

app.get('/index.html', checkAuth, (req, res) => {

    res.redirect('/home.html')
})

app.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('logout.html');
      });
})


///END RUTAs


function checkAuth(req, res, next) {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/index.html')
    }
}





//Middleware de seguridad
function mwAdmin(req,res,next){
    if(ISADMIN){
        next()
    }else{
        const error={
            error:-1,
            descripcion: `Ruta ${req.url} metodo ${req.method} no autorizado.`
        }
        res.status(500).send(error)
    }
}

//Manejador de errores
app.use(function(err,req,res,next){
    console.log(err.stack)
    res.status(500).send('Ocurrio un error: '+err)
})

app.use(function(req,res,next) {

    const error = {
        error:-2,
        descripcion:`ruta ${req.path} metodo ${req.method} no implementado.`
    }
    res.status(500).send(error)
})


export default app