const express = require('express');
const routerMedicalStaff = express.Router();
const medicalStaffController = require('../controllers/medicalStaff.controller');


routerMedicalStaff.get('/getAll/:getterId', medicalStaffController.getAllMedicalStaff);
routerMedicalStaff.get('/getOne/:getterId/:medicalStaffId', medicalStaffController.getOneMedicalStaff);
routerMedicalStaff.post('/postOne/:createrId', medicalStaffController.addOneMedicalStaff);
routerMedicalStaff.put('/updateOne/:updaterId/:medicalStaffId', medicalStaffController.updateOneMedicalStaff);
routerMedicalStaff.delete('/deleteOne/:deleterId/:medicalStaffId', medicalStaffController.deleteOneMedicalStaff);

module.exports = routerMedicalStaff; 