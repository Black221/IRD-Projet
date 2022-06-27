const express = require('express');
const router = express.Router();

const restoreController = require('../controllers/restore.controller');


router.get('/getAllMedicalStaff/:getterId', restoreController.getAllMedicalStaff);
router.get('/getAllPatient/:getterId', restoreController.getAllPatient);
router.get('/getAllAssistant/:getterId', restoreController.getAllAssistant);
router.get('/getAllEcg/:getterId', restoreController.getAllEcg);
router.get('/getOneMedicalStaff/:getterId/:medicalStaffId', restoreController.getOneMedicalStaff);
router.get('/getOneAssistant/:getterId/:assistantId', restoreController.getOneAssistant);
router.get('/getOnePatient/:getterId/:patientId', restoreController.getOnePatient);
router.get('/getOneEcg/:getterId/:ecgId', restoreController.getOneEcg);
router.put('/restoreMedicalStaff/:deleterId/:medicalStaffId', restoreController.restoreMedicalStaff);
router.put('/restorePatient/:deleterId/:patientId', restoreController.restorePatient);
router.put('/restoreAssistant/:deleterId/:assistantId', restoreController.restoreAssistant);
router.put('/restoreEcg/:deleterId/:ecgId', restoreController.restoreEcg);

module.exports = router;