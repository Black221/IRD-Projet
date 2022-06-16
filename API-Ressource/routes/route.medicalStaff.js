const express = require('express');
const routerMedicalStaff = express.Router();
const medicalStaffController = require('../controllers/medicalStaff.controller');

/**
 * routes for medicalStaff
**/

routerMedicalStaff.get('/getAll/:userId', medicalStaffController.getAllMedicalStaff);
routerMedicalStaff.get('/getOne/:medicalStaffId', medicalStaffController.getMedicalStaffById);
routerMedicalStaff.post('/postOne/:posterId', medicalStaffController.postOneMedicalStaff); 
routerMedicalStaff.put('/updateOne/updaterId/:medicalStaffId', medicalStaffController.updateMedicalStaff);
routerMedicalStaff.delete('/deleteOne/deleterId/:medicalStaffId', medicalStaffController.deleteMedicalStaff);

module.exports = routerMedicalStaff;