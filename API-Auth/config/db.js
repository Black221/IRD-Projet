const mongoose = require('mongoose');

mongoose
    .connect(
        'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@gucluster.rymld.mongodb.net/'+process.env.DB_NAME,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("Connected to Mongodb")
    })
    .catch((err) => {
        console.log("Error connecting to Mongodb\n", err)
    });