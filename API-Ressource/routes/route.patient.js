const express = require('express');
const routerPatient = express.Router();
const patientController = require('../controllers/patient.controller');

/**
 * routes for patient
 */
routerPatient.get('/getAll', patientController.getAllPatients);
routerPatient.get('/getOne/:patientId', patientController.getSinglePatient);
routerPatient.post('/postOne/:createrId', patientController.recordPatient);
routerPatient.get('/getByDoctor/:doctorId', patientController.getPatientsByDoctorId);
routerPatient.put('/updateOne/:patientId', patientController.updatePatient);
routerPatient.put('/updateOnDeleteCascade/:patientId', patientController.updateOnDeleteCascade);
routerPatient.put('/updateDoctor/:doctorId/:patientId', patientController.updateDoctor);
routerPatient.delete('/deleteOne/:patientId', patientController.deletePatient);

module.exports = routerPatient;