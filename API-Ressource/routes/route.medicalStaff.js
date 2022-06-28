const express = require('express');
const routerMedicalStaff = express.Router();
const medicalStaffController = require('../controllers/medicalStaff.controller');


routerMedicalStaff.get('/getAll', medicalStaffController.getAllMedicalStaff);
routerMedicalStaff.get('/getOne/:medicalStaffId', medicalStaffController.getMedicalStaffById);
routerMedicalStaff.post('/postOne', medicalStaffController.postOneMedicalStaff);
routerMedicalStaff.put('/updateOne/:medicalStaffId', medicalStaffController.updateMedicalStaff);
routerMedicalStaff.delete('/deleteOne/:medicalStaffId', medicalStaffController.deleteMedicalStaff);

module.exports = routerMedicalStaff;