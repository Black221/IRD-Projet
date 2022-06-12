const express = require('express');
const routerPatient = express.Router();
const patientController = require('../controllers/patient.controller');

/**
 * routes for patient
 */
routerPatient.get('/', patientController.getAllPatients);
routerPatient.get('/:id', patientController.getSinglePatient);
routerPatient.post('/', patientController.recordPatient);
routerPatient.put('/:id', patientController.upadatePatient);
routerPatient.delete('/:id', patientController.deletePatient);

module.exports = routerPatient;