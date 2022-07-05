const express = require('express');
const routerSymptom = express.Router();
const symptomController  = require('../controllers/symptom.controller');

/**
 * routes for symptom
 */
routerSymptom.get('/getAll', symptomController.getAllSymptom);
routerSymptom.post('/postOne', symptomController.addOneSymptom);
routerSymptom.put('/updateOne/:updaterId/:symptomId', symptomController.updateOneSymptom);
routerSymptom.delete('/deleteOne/:deleterId/:symptomId', symptomController.deleteOneSymptom);

module.exports = routerSymptom;