class Usuario{
    constructor(nombre, apellido, libros=[], mascotas=[]){
        this.nombre=nombre
        this.apellido=apellido
        this.libros=libros
        this.mascotas=mascotas        
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
        this.libros.push({'nombre':nombreLibro, 'autor':autorLibro})
    }

    getBookNames(){
        return this.libros.map(libro=>libro.nombre)
    }
}

usr1=new Usuario('Pedro','Perez')

usr2=new Usuario('Juan','Marquez',[{'nombre':'El senor de los anillos', 'autor':'JRR Tolkien'}])

usr3=new Usuario('Carlos','Rodriguez',[{'nombre':'El patron Bitcoin', 'autor':'Saiffedean Ammous'},{'nombre':'La biblia', 'autor':'Dios'}],['Flopy', 'Bestia'])

usr1.addBook('Harry Potter y la Piedra Filosofal', 'J.K. Rowling')
usr1.addMascota('Baltazar')

console.log(usr1.getFullName())
console.log(usr1.countMascotas())
console.log(usr1.getBookNames())