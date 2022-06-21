const express = require("express")
const router = express.Router()

// controller
const EcgMetadataController = require('../controllers/ecgMetadata.controller')

// Créer un ECG Metadata
router.post('/postOne/:createrId/:ecgId', EcgMetadataController.addOneECGMetadata)

//expoest router
module.exports = router