const express = require("express")
router = express.Router()

//Models
const DatasetModel = require("../models/DatasetModel")
const MetadataModel = require("../models/MetadataModel")

// Controllers
const DatasetController = require('../controllers/DatasetController')

//Creer une pathologie
router.post('/', DatasetController.addOneDataset)

//Afficher toutes les pathologies
router.get('/', DatasetController.getAllDataset)

//Afficher une pathologie
router.get('/:datasetId', DatasetController.getOneDataset)

//Modifier une pathologie
router.patch('/:datasetId', DatasetController.updateOneDataset)

//Supprimer une pathologie
router.delete('/:datasetId', DatasetController.removeOneDataset)


module.exports = router
