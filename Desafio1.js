class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre=nombre
        this.apellido=apellido

        if(!libros){
            this.libros=[]
        }else{
            this.libros=[JSON.parse(libros)]
        }

        if(!mascotas){
            this.mascotas=[]
        }else{
            this.mascotas=mascotas
        }
        
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombreLibro, autorLibro){
        console.log(`{"nombre":"${nombreLibro}", "autor":"${autorLibro}"}`)
        this.libros.push(JSON.parse(`{"nombre":"${nombreLibro}", "autor":"${autorLibro}"}`))
    }

    getBookNames(){
        return this.libros.map(libro=>libro.Nombre)
    }
}

usr1=new Usuario('Pedro','Perez')

usr2=new Usuario('Juan','Marquez','{"nombre":"El senor de los anillos", "autor":"JRR Tolkien"}')

usr3=new Usuario('Carlos','Rodriguez','{"nombre":"El patron Bitcoin", "autor":"Saiffedean Ammous"}',['Flopy', 'Bestia'] )