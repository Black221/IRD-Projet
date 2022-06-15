const express = require("express")
routerDataset = express.Router()

//Models
const DatasetModel = require("../models/DatasetModel")
const MetadataModel = require("../models/MetadataModel")

// Controllers
const DatasetController = require('../controllers/dataset.controller')

//Creer une pathologie
routerDataset.post('/postOne/:createrId', DatasetController.addOneDataset)

//Afficher toutes les pathologies
routerDataset.get('/getAll', DatasetController.getAllDataset)

//Afficher une pathologie
routerDataset.get('/getOne/:datasetId', DatasetController.getOneDataset)

//Modifier une pathologie
routerDataset.patch('/updateOne/:updaterId/:datasetId', DatasetController.updateOneDataset)

//Supprimer une pathologie
routerDataset.delete('/deleteOne/:datasetId', DatasetController.removeOneDataset)


module.exports = routerDataset
