const express = require('express');
const router = express.Router();

const restoreController = require('../controllers/restore.controller');


router.get('/getAllMedicalStaff', restoreController.getAllMedicalStaff);
router.get('/getAllPatient', restoreController.getAllPatient);
router.get('/getAllAssistant', restoreController.getAllAssistant);
router.get('/getAllEcg', restoreController.getAllEcg);
router.get('/getOneMedicalStaff/:medicalStaffId', restoreController.getOneMedicalStaff);
router.get('/getOneAssistant/:assistantId', restoreController.getOneAssistant);
router.get('/getOnePatient/:patientId', restoreController.getOnePatient);
router.get('/getOneEcg/:ecgId', restoreController.getOneEcg);
router.put('/restoreMedicalStaff/:medicalStaffId', restoreController.restoreMedicalStaff);
router.put('/restorePatient/:patientId', restoreController.restorePatient);
router.put('/restoreAssistant/:assistantId', restoreController.restoreAssistant);
router.put('/restoreEcg/:ecgId', restoreController.restoreEcg);

module.exports = router;