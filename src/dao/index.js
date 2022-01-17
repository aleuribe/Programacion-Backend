let productosDao
let carritosDao

switch (process.env.PERS) {
    case 'json': 
        //const {default: CarritosDaoFile } = await import('./carritos/CarritosDaoFile')
        //const {default: ProductosDaoFile } = await import('./productos/ProductosDaoFile')
       // productosDao = new ProductosDaoFile()
       // carritosDao = new CarritosDaoFile()
        break
    
    case 'firebase':
        const {default: CarritosDaoFirebase } = await import('./carritos/CarritosDaoFirebase')
        const {default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase')
        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()
        break
    
    case 'mongodb':
        const {default: CarritosDaoMongo } = await import('../dao/carritos/CarritosDaoMongo.js')
        const {default: ProductosDaoMongo } = await import('../dao/productos/ProductosDaoMongo.js')
        productosDao = new ProductosDaoMongo()
        carritosDao = new CarritosDaoMongo()
        break
    
    default:
        const {default: CarritosDaoFile } = await import('../dao/carritos/CarritosDaoFile.js')
        const {default: ProductosDaoFile } = await import('../dao/productos/ProductosDaoFile.js')
        productosDao = new ProductosDaoFile()
        carritosDao = new CarritosDaoFile()
        break
}

export {productosDao, carritosDao}