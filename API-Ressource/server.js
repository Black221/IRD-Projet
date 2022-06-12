/**
 * INCLUDES MODULES AND SETS UP SERVER
 */
require('dotenv').config({ path: 'config/.env' });
const express = require('express');
const routeForEcg = require('./routes/route.ecg');
const routeForPatient = require('./routes/route.patient');
const routeForMedicalStaff = require('./routes/route.medicalStaff');
const routeForDataset = require('./routes/route.dataset');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/**
 * middlewares
 */
app.use(bodyParser.json());

app.use('/ecg', routeForEcg);
app.use('/patient', routeForPatient);
app.use('/medicalStaff', routeForMedicalStaff);
app.use('/dataset', routeForDataset);

/**
 * Connexion to our database
 */

//mongodb+srv://ird_esp:passer@dbtest.mlfjm.mongodb.net/?retryWrites=true&w=majority

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/apiRessources');
    console.log('Connected to MongoDB database successfully');
}
/*
 *listening on port given in .env file
 */

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
