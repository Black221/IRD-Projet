const express = require("express")
router = express.Router()

//models
const EcgMetadataModel = require("../models/EcgMetadataModel")
const EcgModel = require("../models/EcgModel")
const MetadataModel = require("../models/MetadataModel")


// controller
const EcgMetadataController = require('../controllers/ecgMetadata.controller')

// Créer un ECG Metadata
router.post('/', EcgMetadataController.addOneECGMetadata)

