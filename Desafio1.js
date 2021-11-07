class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre=nombre
        this.apellido=apellido
        this.libros=[libros]
        this.mascotas=[mascotas]
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
        return `Mascota ${nombreMascota} agregada exitosamente`
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombreLibro, autorLibro){
        const book = new Object()
        book.Nombre=nombreLibro
        book.Autor=autorLibro

        this.libros.push(book)

        return `Libro ${nombreLibro} agregado exitosamente`
    }

    getBookNames(){
        return this.libros.map(libro=>libro.Nombre)
    }
}

module.exports = Usuario