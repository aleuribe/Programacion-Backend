const express = require('express')
const Contenedor = require('./libs/Contenedor.js')

const {Router} = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views', './views')
app.set('view engine', 'ejs')

const router = Router()
const libreria = new Contenedor(__dirname + '/data/productos.json')

const PORT = 8080

//Devuelve todos los productos: GET /api/productos
router.get("/", (req, res) => {
    return res.json(libreria.list)
})

//Devuelve un producto segun su ID: GET /api/productos/:id
router.get("/:id", (req, res) => {
    let id = req.params.id
    return res.json(libreria.find(id))
})

//Recibe y agrega un producto y lo devuelve con su ID asignado: POST /api/productos
router.post("/", (req, res) => {
    let obj = req.body
    libreria.insert(obj)
    return res.redirect('/list')
})

//Recibe y actualiza un producto segun su id: PUT /api/productos/:id
router.put("/:id", (req, res) => {
    let obj = req.body
    let id = req.params.id
    return res.json(libreria.update(id,obj))
})

router.delete("/:id", (req,res) => {
    let id = req.params.id
    return(res.json(libreria.delete(id)))
})

app.use('/api/productos', router)

app.get('/', (req, res) => {
    return res.render('ejs/form')
})

app.get('/list', (req, res) => {
    return res.render('ejs/list', libreria)
})


app.listen(process.env.PORT || PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

//Manejador de errores
app.use(function(err,req,res,next){
    console.log(err.stack)
    res.status(500).send('Ocurrio un error: '+err)
})