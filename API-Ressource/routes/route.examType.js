const express = require('express');
const routerExamType = express.Router();
const examTypeController  = require('../controllers/examType.controller');

/**
 * routes for examType
 */
routerExamType.get('/getAll', examTypeController.getAllExamType);
routerExamType.post('/postOne', examTypeController.addOneExamType);
routerExamType.put('/updateOne/:updaterId/:examTypeId', examTypeController.updateOneExamType);
routerExamType.delete('/deleteOne/:deleterId/:examTypeId', examTypeController.deleteOneExamType);

module.exports = routerExamType;