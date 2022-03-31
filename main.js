import 'dotenv/config'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import cluster from 'cluster'
import os from 'os'

const args = yargs(hideBin(process.argv))
    .default({
        port:8080,
        dao:'mongodb',
        mode:'CLUSTER'
    })
    .parse()

process.env.DAO = args.dao
process.env.MODE = args.mode
process.env.PORT = args.port

const numCPUs = os.cpus().length

import app from './service/server.js'

if (process.env.MODE && process.env.MODE == 'CLUSTER' && cluster.isMaster) {
    console.log(`Master ${process.pid} is running on ${process.env.PORT}`)

    for(let i=0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
    })
} else {

    const server = app.listen(process.env.PORT, () => {
        console.log(`Servidor escuchando en puerto ${server.address().port} en modo ${process.env.MODE}`)
    })

    server.on('error', error => console.log(`Error en servidor ${error}`))

    console.log(`Worker ${process.pid} started`)
}