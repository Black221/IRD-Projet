const express = require("express")
routerDataset = express.Router()

// Controllers
const DatasetController = require('../controllers/dataset.controller')

//Creer une pathologie
routerDataset.post('/postOne/:createrId', DatasetController.addOneDataset)

//Afficher toutes les pathologies
routerDataset.get('/getAll', DatasetController.getAllDatasets)

//Afficher une pathologie
routerDataset.get('/getOne/:datasetId', DatasetController.getOneDataset)

//Modifier une pathologie
routerDataset.put('/updateOne/:updaterId/:datasetId', DatasetController.updateOneDataset)


module.exports = routerDataset