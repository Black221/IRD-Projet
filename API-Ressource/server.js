/**
 * INCLUDES MODULES AND SETS UP SERVER
 */
require('dotenv').config({ path: './.env' });
require('./db')
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


/*
 *listening on port given in .env file
 */

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
