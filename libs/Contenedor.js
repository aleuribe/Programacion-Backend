const fs = require('fs')

const error = {'error':'producto no encontrado'}

class Contenedor {
    constructor(nombreArchivo) {
        this.id = 0
        this.list = []
        this.filename = nombreArchivo

        this.init()
    }

    init(){
        const data = fs.readFileSync(this.filename)
        const listaFromFile = JSON.parse(data)

        for (const obj of listaFromFile) {
            this.insert(obj)
        }
    }

    insert(obj) {
        obj.id = ++this.id
        this.list.push(obj)

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
}

module.exports = Contenedor
