const express = require('express');
const routerMedicalStaff = express.Router();
const medicalStaffController = require('../controllers/medicalStaff.controller');

/**
 * routes for medicalStaff
 */

routerMedicalStaff.get('/', medicalStaffController.getAllMedicalStaff);
routerMedicalStaff.get('/:id', medicalStaffController.getMedicalStaffById);
routerMedicalStaff.post('/', medicalStaffController.postOneMedicalStaff);
routerMedicalStaff.put('/:id', medicalStaffController.updateMedicalStaff);
routerMedicalStaff.delete('/:id', medicalStaffController.deleteMedicalStaff);

module.exports = routerMedicalStaff;