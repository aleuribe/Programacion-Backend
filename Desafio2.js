const Contenedor = require('./Contenedor.js')

class Libro {
    constructor(title,price,thumbnail){
        this.title=title,
        this.price=price,
        this.thumbnail=thumbnail
    }
}

const run = async function () {
    const cc = new Contenedor('libros.txt')
    await cc.query()

    //Ejecucion
    //1. Generamos los objetos con libros de ejemplo
    const libro1=new Libro('El senor de los anillos','120','http://aws/s3/img1.png')
    const libro2=new Libro('Harry Potter y la Piedra Filosofal','220','http://aws/s3/img2.png')
    const libro3=new Libro('El patron Bitcoin','300','http://aws/s3/img3.png')

    //2. Probamos el metodo save()
    console.log('*********************************')
    console.log(`Funcion save():`)
    console.log(`Guardando libro ${await cc.save(libro1)}`)
    console.log(`Guardando libro ${await cc.save(libro2)}`)
    console.log(`Guardando libro ${await cc.save(libro3)}`)

    //3. Probamos el metodo getAll()
    let lista = cc.getAll()
    console.log('*********************************')
    console.log(`Funcion getAll(): tenemos ${lista.length} libros en la lista.`)
    console.log(lista)

    //4. Probamos el metodo getByID()
    console.log('*********************************')
    console.log(`Funcion getByID(1): Se obtiene el objeto con id 1`)
    console.log(cc.getByID(1))
    console.log(`Busquemos un objeto inexistente a ver que pasa, por ejemplo el 9999:`)
    console.log(cc.getByID(9999))

    //5. Probamos el metodo deleteByID()
    console.log('*********************************')
    console.log(`Funcion deleteByID(1): Se va a eliminar el objeto con id 1`)

    console.log(`Teniamos ${await cc.getAll().length} elementos`)
    await cc.deleteByID(1)
    console.log(`Ahora tenemos ${await cc.getAll().length} elementos, a continuacion:`)
    console.log(cc.getAll())
    
    //6. Probamos el metodo deleteAll()
    console.log('*********************************')
    console.log(`Funcion deleteAll(): Se van a borrar todos los elementos`)
    await cc.deleteAll()
    console.log(`Ahora tenemos ${await cc.getAll().length} elementos, a continuacion:`)
    console.log(cc.getAll())
}


run()