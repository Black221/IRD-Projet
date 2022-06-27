const express = require('express');
const router = express.Router();

const assistantController = require('../controllers/assistant.controller');

router.get('/getAll/:getterId', assistantController.getAllAssistant)
router.get('/getOne/:getterId/:assistantId', assistantController.getAssistantById)
router.post('/postOne/:posterId/:doctorId', assistantController.postOneAssistant)
router.put('/updateOne/:updaterId/:assistantId', assistantController.updateAssistant)
router.put('/updateDoctor/:upaterId/:doctorId/:assistantId', assistantController.updateDoctor);
router.delete('/deleteOne/:deleterId/:assistantId', assistantController.deleteAssistant)

module.exports = router;