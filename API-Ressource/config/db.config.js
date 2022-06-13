
/**
 * Connexion to our database
 */

//mongodb+srv://ird_esp:passer@dbtest.mlfjm.mongodb.net/?retryWrites=true&w=majority

import mongoose from "mongoose";

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/apiRessources');
    console.log('Connected to MongoDB database successfully');
}

module.exports = main;