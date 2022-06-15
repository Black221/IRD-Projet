
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const fs = require('fs')

// const uri = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@guapicluster.z5rby.mongodb.net/"+process.env.DB_NAME;
const uri = "mongodb+srv://ird_esp:passer@dbtest.mlfjm.mongodb.net/?retryWrites=true&w=majority"

const uri_local = "mongodb://localhost:27017/"+process.env.DB_LOCAL_NAME;
let connected = false;
let start = false;

let localConnect = function () {
    // DB connection
    mongoose.connect(uri_local)
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Erreur lors de la de connection à la base de donnée...'))
    db.once('open', function(){
        console.log('Connexion à la base de donnée établie...: http://localhost:'+process.env.PORT);
        var dir= './ECG'
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
    })
}


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
    if (!err) {
        connected = true;
        console.log("Connected to MongoDB");
        var dir= './ECG'
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
    } else {
        console.log("Error to connect on MongoDB: ", err);
        console.log("Trying to connect on local db ....");
        localConnect();
    }
    // perform actions on the collection object
});