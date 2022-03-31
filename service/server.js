import express from 'express'
import { routerProduct, routerCart, routerBase, passport} from '../routes/routes.js'
import session from 'express-session'

const app = express()

//Configuracion del servidor

app.use(express.static(process.env.PWD + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', routerProduct)
app.use('/api/carrito', routerCart)
app.use('/', routerBase)

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