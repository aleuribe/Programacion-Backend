const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.archivo=nombreArchivo
        this.id=0
        this.lista=[]
    }

    //Metodo que leera el archivo y guardara su contenido en un objeto
    async query(){
        try{
            const contenido = await fs.promises.readFile(this.archivo)
            this.lista = JSON.parse(contenido)
        }catch(err) {
            console.log('No se pudo leer archivo, probablemente esta vacio o no exista. ' + err)
        }
    }

    async write(){
        try{
            await fs.promises.writeFile(this.archivo,JSON.stringify(this.lista))

        } catch (err) {
            console.log('no se pudo escribir el archivo ' + err)
        }
    }

    async save(objeto){
        //Recibe un objeto, lo guarda en el archivo, devuelve el ID asignado. Se incorpora un ID numerico, debera ser siempre +1 que el anterior y no puede estar repetido.

        if (this.lista.length>0){
            this.id = this.lista[this.lista.length-1].id + 1
        }else{
            this.id = 0
        }
        
        const objetoAGuardar = {
            ...objeto,
            id:this.id
        }

        this.lista.push(objetoAGuardar)

        //Escribimos en el archivo
        await this.write()

        return this.id

    }

    getByID(id){
        //Recibe un ID, devuelve el objeto con ese ID o null si no esta
        const obj = this.lista.filter(lista => lista.id==id)

        if (obj.length == 0){
            return null
        }else{
            return obj
        }

    }

    getAll(){

        return this.lista

    }

    async deleteByID(id){
        //Retorna la lista de objetos sin contener el ID a eliminar
        this.lista = this.lista.filter(obj => obj.id != id)

        //Ahora escribimos el file
        await this.write()
    }

    async deleteAll(){
        this.lista=[]
        await this.write()
    }
}

module.exports = Contenedor
