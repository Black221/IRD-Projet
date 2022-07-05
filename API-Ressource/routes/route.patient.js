const express = require('express');
const routerPatient = express.Router();
const patientController = require('../controllers/patient.controller');

/**
 * routes for patient
 */
routerPatient.get('/getAll', patientController.getAllPatient);
routerPatient.get('/getOne/:patientId', patientController.getOnePatient);
routerPatient.post('/postOne/:createrId', patientController.addOnePatient);
routerPatient.put('/updateOne/:updaterId/:patientId', patientController.updateOnePatient);
routerPatient.delete('/deleteOne/:deleterId/:patientId', patientController.deleteOnePatient);

module.exports = routerPatient;