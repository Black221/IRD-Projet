const express = require('express');
const router = express.Router();

const assistantController = require('../controllers/assistant.controller');

router.get('/getAll', assistantController.getAllAssistant)
router.get('/getOne/:assistantId', assistantController.getAssistantById)
router.post('/postOne/:doctorId', assistantController.postOneAssistant)
router.put('/updateOne/:assistantId', assistantController.updateAssistant)
router.put('/updateDoctor/:doctorId/:assistantId', assistantController.updateDoctor);
router.delete('/deleteOne/:assistantId', assistantController.deleteAssistant)

module.exports = router;