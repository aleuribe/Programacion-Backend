const Contenedor = require('./Contenedor.js')
const express = require('express')

const app = express()

const PORT = 8080

const cc = new Contenedor('libros.txt')
let productos = []

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
    productos = cc.query()
})

app.get('/productos', (request, response) => {
    
    productos = cc.getAll()
    response.send(productos)
})

app.get('/productoRandom', (request, response) => {
    productos = cc.getAll()
    const item = productos[Math.random()*productos.length | 0]
    response.send(item)
})
