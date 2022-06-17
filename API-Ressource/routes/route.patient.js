const express = require('express');
const routerPatient = express.Router();
const patientController = require('../controllers/patient.controller');

/**
 * routes for patient
 */
routerPatient.get('/getAll', patientController.getAllPatients);
routerPatient.get('/getOne/:patientId', patientController.getSinglePatient);
routerPatient.post('/postOne/:createrId', patientController.recordPatient);
routerPatient.put('/updateOne/:updaterId/:patientId', patientController.upadatePatient);
routerPatient.delete('/deleteOne/:patientId', patientController.deletePatient);
routerPatient.put('/updateDoctor/:updaterId/:doctorId/:patientId', patientController.updateDoctor);

module.exports = routerPatient; 