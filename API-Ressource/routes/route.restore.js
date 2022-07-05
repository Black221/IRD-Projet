const express = require('express');
const router = express.Router();

const restoreController = require('../controllers/restore.controller');


router.get('/getAllMedicalStaff', restoreController.getAllMedicalStaff);
router.get('/getAllPatient', restoreController.getAllPatient);
router.get('/getAllEcg', restoreController.getAllEcg);
router.get('/getAllExamType', restoreController.getAllExamType);
router.get('/getOneMedicalStaff/:medicalStaffId', restoreController.getOneMedicalStaff);
router.get('/getOnePatient/:patientId', restoreController.getOnePatient);
router.get('/getOneEcg/:ecgId', restoreController.getOneEcg);
router.put('/restoreMedicalStaff/:medicalStaffId', restoreController.restoreMedicalStaff);
router.put('/restorePatient/:patientId', restoreController.restorePatient);
router.put('/restoreEcg/:ecgId', restoreController.restoreEcg);
router.put('/restoreExamType/:examTypeId', restoreController.restoreExamType);



module.exports = router; 