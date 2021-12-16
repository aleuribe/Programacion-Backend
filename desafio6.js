const fs = require('fs')
const express = require('express')
const Contenedor = require('./libs/Contenedor.js')
const {Router} = express
const router = Router()

const app = express()

//const httpServer = new HttpServer(app)
//const io = new IOServer(httpServer)

const PORT = 8080

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const messages = [
    {author: 'System@ofADown.com', text: 'Bienvenido al server'}
]

//Set template engine
app.set('views', './views')
app.set('view engine', 'ejs')

const libreria = new Contenedor(__dirname + '/data/productos.json')

//Devuelve todos los productos: GET /api/productos
router.get("/", (req, res) => {
    return res.render(libreria.list)
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
    return res.redirect('/')
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
    return res.render('ejs/index', libreria)
})

//Websocket

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

const io = require('socket.io')(server)

io.on("connection", (socket) => {
    let currentTime = new Date().toLocaleTimeString()
    console.log(`${currentTime} New user connected`)
    socket.emit('messages', messages)

    //Para emitir los mensajes que llegan y sea broadcast
    socket.on("newMessage", data => {
        messages.push(data)
        io.sockets.emit("messages", messages)

        write()

    })
})

async function write(){
    try{
        await fs.promises.writeFile('chat.txt',JSON.stringify(messages))

    } catch (err) {
        console.log('no se pudo escribir el archivo ' + err)
    }
}

//Manejador de errores
app.use(function(err,req,res,next){
    console.log(err.stack)
    res.status(500).send('Ocurrio un error: '+err)
})