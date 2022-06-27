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
routerEcg.get('/getAll/:getterId', ecgController.getAllEcg);
routerEcg.get('/getByDataset/:getterId/:datasetId', ecgController.getEcgByDataset);
routerEcg.get('/getbyPatient/:getterId/:patientId', ecgController.getEcgByPatient);
routerEcg.get('/getOne/:getterId/:ecgId', ecgController.getOneEcg);
routerEcg.post('/postOne/:createrId/:datasetId/:patientId', ecgController.addOneEcg);
routerEcg.put('/updateOne/:updaterId/:datasetId/:patientId/:ecgId', ecgController.updateOneEcg);
routerEcg.delete('/deleteOne/:deleterId/:ecgId', ecgController.deleteOneEcg);

module.exports = routerEcg;