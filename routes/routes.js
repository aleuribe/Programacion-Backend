import { Router } from 'express'
import {getProductByID, getAllProducts, postProduct, putProductByID, deleteProductByID, getAllCarts, postCart, getProductsFromCart, postProductToCartByID, deleteProductFromCartByID} from '../controller/controller.js'

const errorProductoSinStock = {'error':'producto sin stock'}
const errorProductoNoExiste = {'error':'producto no existe'}

const ISADMIN = true

//Router base /api/productos
const routerProduct = new Router()

//Funcionalidad a: GET /:id --> Devuelve un producto segun su ID || para users y admins
routerProduct.get("/:id", checkAuth, getProductByID)

routerProduct.get("/", getAllProducts)

//Funcionalidad b: POST / --> Incorpora productos al listado || solo admins
routerProduct.post("/", mwAdmin, checkAuth, postProduct)

//Funcionalidad c: PUT /:id --> Actualiza un producto segun su id || solo admins
routerProduct.put("/:id", mwAdmin, checkAuth, putProductByID)

//Funcionalidad d: Borra un producto segun su ID || solo admins
routerProduct.delete("/:id", mwAdmin, checkAuth, deleteProductByID)


//Router base /api/carrito
const routerCart = new Router()
//Funcionalidad extra: GET / --> obtiene el listado de carritos || usuarios y admins
routerCart.get("/", getAllCarts)

//Funcionalidad a: POST / --> Crea un carrito y devuelve su id || usuarios y admins
routerCart.post("/", checkAuth , postCart)

//Funcionalidad b: DELETE /:id --> Vacia un carrito y lo elimina || usuarios y admins
routerCart.delete("/:id", checkAuth , deleteCartByID)

//Funcionalidad c: GET /:id/productos --> Permite listar todos los productos del carrito || usuarios y admins
routerCart.get("/:id/productos", checkAuth, getProductsFromCart)

//Funcionalidad d: POST: /:id/productos --> Incorpora productos al carrito por id de carrito? || usuarios y admins
routerCart.post("/:id/productos", checkAuth, postProductToCartByID)

//Funcionalidad e: DELETE: /:id/productos/:id_prod --> Elimina un producto del carrito por su id de carrito y de producto
routerCart.delete("/:id/productos/:idprod", checkAuth, deleteProductFromCartByID)

///RUTAS LOGIN
const routerBase = new Router()

routerBase.get('/login', (req, res) => {
    if(req.isAuthenticated()) {
        var user = req.user
        console.log("Usuario logueado")
        
        res.send('login-ok')
    }else{

        res.redirect('/login.html')
    }
})

routerBase.post('/login', passport.authenticate('login'), (req, res) => {

    res.redirect('home.html')
})

routerBase.get('/register', (req, res) => {
    res.redirect('register.html')
})

routerBase.post('/buyCart', (req, res) => {

    const buyCart = req.body

    const messageNewBuy = `Nuevo pedido de ${req.user.name} ${req.user.username}` 
    
    sendEmail(buyCart, messageNewBuy)
    sendWhatsapp(messageNewBuy)    

    res.send({'mensaje':'compra exitosa'})
})

routerBase.post('/register', passport.authenticate('signup'), (req, res) => {

    res.redirect('login.html')
})

routerBase.get('/index.html', checkAuth, (req, res) => {

    res.redirect('/home.html')
})

routerBase.get('/logout', (req, res) => {
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



module.exports = {
    routerProduct, routerCart, routerBase
}