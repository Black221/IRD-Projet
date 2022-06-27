const express = require("express")
router = express.Router()

//models


// controller
const EcgMetadataController = require('../controllers/ecgMetadata.controller')

// Créer un ECG Metadata
router.post('/postOne/:createrId/:ecgId', EcgMetadataController.addOneECGMetadata)
router.get('/getAge/:ecgId', EcgMetadataController.calculAge)

module.exports = router