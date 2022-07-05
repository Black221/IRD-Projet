const express = require('express');
const routerExam = express.Router();
const examController = require('../controllers/exam.controller');


routerExam.get('/getAll', examController.getAllExam);
routerExam.get('/getOne/:examId', examController.getOneExam);
routerExam.post('/postOne/:createrId', examController.addOneExam);
routerExam.put('/updateOne/:updaterId/:examId', examController.updateOneExam);
routerExam.delete('/deleteOne/:deleterId/:examId', examController.deleteOneExam);

module.exports = routerExam; 