let productosDao
let carritosDao

switch (process.env.DAO) {
    case 'file': 
        const {default: CarritosDaoFile } = await import('../constructor/carritos/CarritosDaoFile.js')
        const {default: ProductosDaoFile } = await import('../constructor/productos/ProductosDaoFile.js')
        productosDao = new ProductosDaoFile()
        carritosDao = new CarritosDaoFile()
        break
    
    case 'mongodb':
        const {default: CarritosDaoMongo } = await import('../constructor/carritos/CarritosDaoMongo.js')
        const {default: ProductosDaoMongo } = await import('../constructor/productos/ProductosDaoMongo.js')
        productosDao = new ProductosDaoMongo()
        carritosDao = new CarritosDaoMongo()
        break
}

export {productosDao, carritosDao}