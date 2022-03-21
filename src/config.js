export default {

    filesystem: {
        path: process.env.PWD + '/data'
    },

    mongodb: {
        string: 'mongodb+srv://user:user123@cluster0.n3sme.mongodb.net/eCommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    }

}