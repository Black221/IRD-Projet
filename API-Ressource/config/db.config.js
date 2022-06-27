const { mongoose } = require('mongoose')

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/' + process.env.DB_LOCAL_NAME)
    console.log("connexion etablie avec " + process.env.DB_LOCAL_NAME + " avec succes !")
}