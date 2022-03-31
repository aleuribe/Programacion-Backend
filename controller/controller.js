import {
    productosDao as products,
    carritosDao as cart
} from './constructor/index.js'

function getProductByID (req, res) {
    let id = req.params.id
    return res.json(products.find(id))
}

function getAllProducts (req, res) {
    return res.json(products.list)
}

function postProduct (req, res) {
    let obj = req.body
    let post = products.insert(obj)
    products.write()
    return res.json(post)
}

function putProductByID (req, res) {
    let obj = req.body
    let id = req.params.id
    let put = res.json(products.update(id,obj))
    products.write()
    return put
}

function deleteProductByID (req, res) {
    let id = req.params.id
    let deleted = res.json(products.delete(id))
    products.write()
    return(deleted)
}

function getAllCarts (req, res) {
    return res.json(cart.list)
}

function postCart (req, res) {
    let obj = req.body
    let create = cart.cartCreate()
    if(create>0) {
        cart.write()
    }
    return res.json(create)
}

function deleteCartByID (req, res) {
    let id = req.params.id
    let deleted = cart.cartDrop(id)

    if (deleted.error == undefined) {
        cart.write()
    }

    return(res.json(deleted))
}

function getProductsFromCart (req, res) {
    let id = req.params.id
    let listaProductos = cart.find(id)
    
    if(!listaProductos.productos) {
        return res.json(listaProductos)
    }
    
    return res.json(listaProductos.productos)
}

function postProductToCartByID (req, res) {
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
}

function deleteProductFromCartByID (req, res) {
    let idCart = req.params.id
    let idProd = req.params.idprod
    let deleted = res.json(cart.cartDelete(idCart, idProd))
    cart.write()
    return(deleted)
}

function getLogin (req, res) {
    if(req.isAuthenticated()) {
        var user = req.user
        console.log("Usuario logueado")
        
        res.send('login-ok')
    }else{

        res.redirect('/login.html')
    }
}

function postLogin (req, res) {
    res.redirect('home.html')
}

module.exports = {
    getProductByID, getAllProducts, postProduct, putProductByID, deleteProductByID, getAllCarts, postCart, deleteCartByID, getProductsFromCart, postProductToCartByID, deleteProductFromCartByID, getLogin, postLogin
}