const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.archivo=nombreArchivo
        this.id=0
    }
    async save(objeto){
        //Recibe un objeto, lo guarda en el archivo, devuelve el ID asignado. Se incorpora un ID numerico, debera ser siempre +1 que el anterior y no puede estar repetido.

        let listaObjetos = []

        //Primero, leemos el archivo para poder controlar el metodo append y el ID
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf-8')
            console.log('El archivo pudo ser leido correctamente')
            listaObjetos = JSON.parse(contenido)
        }catch(err) {
            console.log('No se pudo leer archivo ' + err)
        }
        

        //Obtenemos el maximo ID en la lista de objetos del archivo
        const idMax = Math.max(...listaObjetos.map(item => item.id))

        if (idMax>=0) {
            this.id = idMax
            this.id++
        }

        const objetoAGuardar = {
            ...objeto,
            id:this.id
        }

        listaObjetos.push(objetoAGuardar)

        //Escribimos en el archivo
        try{
            await fs.promises.writeFile(this.archivo,JSON.stringify(listaObjetos))
            console.log('Se escribio correctamente')
        } catch (err) {
            console.log('no se pudo escribir el archivo ' + err)
        }

    }

    async getByID(id){
        //Recibe un ID, devuelve el objeto con ese ID o null si no esta

        let listaObjetos = [], item

        try{
            const resultado = await fs.promises.readFile(this.archivo,'utf-8')
                listaObjetos = JSON.parse(resultado)
                item = listaObjetos.filter(lista => lista.id==id)
                console.log(item)  //Si no coloco el console.log aqui, no tengo resultado
                return item
                
        }catch(err){
            console.log('No se pudo leer archivo '+err)
        }
    }

    async getAll(){
        let listaObjetos = []
        //Devuelve un array con los objetos presentes en el archivo
        try {
            const contenido = await fs.promises.readFile(this.archivo,'utf-8')
            console.log('El archivo pudo ser leido correctamente')
            listaObjetos = JSON.parse(contenido)
            console.log(listaObjetos) //Si no coloco el console.log aqui, no tengo resultado
            return listaObjetos
        }catch(err) {
            console.log('No se pudo leer archivo' + err)
        }
    }

    async deleteByID(id){
        //Elimina del archivo el objeto con el ID buscado

        let listaObjetos = []

        //Primero, leemos el archivo para poder controlar el metodo append y el ID
        try {
            const contenido = await fs.promises.readFile(this.archivo,'utf-8')
                console.log('El archivo pudo ser leido correctamente')
                listaObjetos = JSON.parse(contenido)
        }catch (err){
            console.log('No se pudo leer archivo '+ err)
        }
        
        //Borramos el objeto buscado por id
        listaObjetos = listaObjetos,filter(obj => obj.id != id)

        console.log(listaObjetos)

        //Ahora escribimos el file
        try {
            await fs.promises.writeFile(this.archivo,JSON.stringify(listaObjetos))
            console.log('se escribio correctamente')
        }catch(err){
            console.log('no se pudo escribir el archivo ' + err)
            }    
    }

    async deleteAll(){

        try {
            await fs.promises.writeFile(this.archivo,'')
            console.log('se borro correctamente' + resultado)
        }catch(err){
            console.log('no se pudo escribir el archivo ' + err)
            }
        }
}


class Libro {
    constructor(title,price,thumbnail){
        this.title=title,
        this.price=price,
        this.thumbnail=thumbnail
    }
}

//Ejecucion
const libro1=new Libro('El senor de los anillos','120','http://aws/s3/img1.png')
const libro2=new Libro('Harry Potter y la Piedra Filosofal','220','http://aws/s3/img2.png')
const libro3=new Libro('El patron Bitcoin','300','http://aws/s3/img3.png')

const contenedor1 = new Contenedor('libros.txt')

setTimeout( () => {
    contenedor1.save(libro1)

    setTimeout( () => {
        contenedor1.save(libro2)

        setTimeout( () => {
            contenedor1.save(libro3)

            setTimeout( () => {
                contenedor1.getByID(1)
                setTimeout( () => {
                    contenedor1.getAll()
                }, 1500)
            }, 1500)
        }, 1500)
    }, 1500)
}, 1500)











