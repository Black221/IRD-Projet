const express = require('express');
const routerEcg = express.Router();
const ecgController = require('../controllers/ecg.controller');
// const fileUpload = require('express-fileupload');
// routerEcg.use(fileUpload({
//     createParentPath: true
// }));
/**
 * routes for ecg
 */
routerEcg.get('/getAll', ecgController.getAllEcg);
routerEcg.get('/getByDataset/:datasetId', ecgController.getEcgByDataset);
routerEcg.get('/getbyPatient/:patientId', ecgController.getEcgByPatient);
routerEcg.get('/getOne/:ecgId', ecgController.getOneEcg);
routerEcg.post('/postOne/:createrId/:datasetId/:patientId', ecgController.addOneEcg);
routerEcg.put('/updateOne/:updaterId/:datasetId/:patientId/:ecgId', ecgController.updateOneEcg);
routerEcg.delete('/deleteOne/:ecgId', ecgController.deleteOneEcg);

module.exports = routerEcg;