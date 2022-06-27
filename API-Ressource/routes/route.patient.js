const express = require('express');
const routerPatient = express.Router();
const patientController = require('../controllers/patient.controller');

/**
 * routes for patient
 */
routerPatient.get('/getAll/:getterId', patientController.getAllPatients);
routerPatient.get('/getOne/:getterId/:patientId', patientController.getSinglePatient);
routerPatient.post('/postOne/:createrId', patientController.recordPatient);
routerPatient.get('/getByDoctor/:getterId', patientController.getPatientsByDoctorId);
routerPatient.put('/updateOne/:upaterId/:patientId', patientController.updatePatient);
routerPatient.put('/updateDoctor/:upaterId/:doctorId/:patientId', patientController.updateDoctor);
routerPatient.delete('/deleteOne/:deleterId/:patientId', patientController.deletePatient);

module.exports = routerPatient;