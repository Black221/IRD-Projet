const express = require('express');
const routerMedicalStaff = express.Router();
const medicalStaffController = require('../controllers/medicalStaff.controller');

/**
 * routes for medicalStaff
 **/

routerMedicalStaff.get('/getAll', medicalStaffController.getAllMedicalStaff);
routerMedicalStaff.get('/getOne/:medicalStaffId', medicalStaffController.getMedicalStaffById);
routerMedicalStaff.post('/postOne', medicalStaffController.postOneMedicalStaff);
routerMedicalStaff.put('/updateOne/:updaterId/:medicalStaffId', medicalStaffController.updateMedicalStaff);
routerMedicalStaff.delete('/deleteOne/:medicalStaffId', medicalStaffController.deleteMedicalStaff);

module.exports = routerMedicalStaff;