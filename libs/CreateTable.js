const { options } = require('./options')

console.log(options)

const knex = require('knex')(options)

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('title')
    table.float('price')
    table.string('thumbnail')
})
    .then( () => console.log("Table created"))
    .catch(err => {
        console.log(err)
        throw err
    })
    .finally( () => {
        knex.destroy()
    })