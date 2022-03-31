import Contenedor from '../../../model/ContenedorFile.js'

class ProductosDaoFile extends Contenedor {
    constructor() {
        super('productos.json')
    }
}

export default ProductosDaoFile