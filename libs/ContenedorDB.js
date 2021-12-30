const { options } = require('./options')


const error = {'error':'producto no encontrado'}

class ContenedorDB {
    constructor(db, table) {
        this.id = 0
        this.list = []
        this.db = db
        this.table = table

        this.init()
    }

    async init(){
        const knex = require('knex')(this.db)

        await knex.from(this.table).select("*")
            .then( (items) => {
                for (const obj of items) {
                    this.list.push(obj)
                }
            })
            .catch(err => {
                console.log(err)
                throw err
            })
            .finally( () => {
                knex.destroy()
            })
            console.log("======> base de datos cargada")
            console.log(this.list)

    }

    async insert(obj) {
        const knex = require('knex')(this.db)

        console.log("=======>Objeto a insertar")
        console.log(obj)
        //obj.id = ++this.id
        //this.list.push(obj)

        await knex(this.table).insert(obj)
        .then( (id) => {
            console.log(`Objeto insertado en DB con id ${id}` )
            obj.id = id
            this.list.push(obj)
        })
        .catch(err => {
            console.log(err)
            throw err
        })
        .finally( () => {
            knex.destroy()
        })

        return obj
        
    }

    find(id){
        const object = this.list.find((obj) => obj.id == id)

        if(!object){
            return error
        }else{
            return object
        }
    }

    update(id, obj){
        const index = this.list.findIndex((objT) => objT.id == id)

        if(index==-1){
            return error
        }else{
            obj.id = this.list[index].id
            this.list[index] = obj
    
            return obj
        }

    }

    delete(id){

        const object = this.list.find((obj) => obj.id == id)

        if(!object){
            return error
        }else{
            this.list = this.list.filter((obj) => obj.id != id)

            return this.list
        }

    }

    async write(){



        try{
            await fs.promises.writeFile(this.filename,JSON.stringify(this.list))

        } catch (err) {
            console.log('no se pudo escribir el archivo ' + err)
        }
    }
}

const objeto = new ContenedorDB(options, "productos")

const libro = {
    'title':'La biblias',
    'price':2020,
    'thumbnail':'http://biblia.com'
}
console.log("===> imprmiendo libro")
console.log(libro)
objeto.insert(libro)

module.exports = ContenedorDB
