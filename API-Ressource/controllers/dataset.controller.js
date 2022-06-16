const DatasetModel = require("../models/DatasetModel")
const EcgModel = require("../models/EcgModel")
const MetadataModel = require("../models/MetadataModel")
const fs = require("fs")
const EcgController = require('./ecg.controller')

// Afficher toutes les pathologies
module.exports.getAllDataset = async(req, res) => {
    try {
        const allDataset = await DatasetModel.find()
        if (allDataset) {
            res.status(200).json({allDataset})      
        } else {
           res.status(200).json('Rien dans la base de donnée') 
        }
    } catch (error) {
        res.status(500).send('Echec lors de l\'affichage des pathologies présents dans la base de donnée')
    }
}

// Afficher une pathologie
module.exports.getOneDataset = async(req, res) => {
    try {
        const oneDataset = await DatasetModel.findById(req.params.datasetId)
        const oneMetadata = await MetadataModel.findById(oneDataset.metadata_id)
        if (oneDataset) {
           res.status(200).send({oneDataset, oneMetadata})
        } else {
            res.status(400).send({message: 'Id inexistant'})
        }
    } catch (error) {
        res.status(500).send({message: error})
    }
}

// Ajouter une pathologie
module.exports.addOneDataset = async(req, res) => {
    try {
        const metadata = new MetadataModel({
            created_by: req.params.createrId,
            last_updated_by: req.params.createrId
        })
        const newMetadata = await metadata.save()
        const newDataset = new DatasetModel({
            name: req.body.name,
            metadata_id: newMetadata._id,
            description: req.body.description
        })
        const data = newDataset.save()
        res.status(200).send({data, newMetadata})
        // const datasetRep = dataset._id +"_"+ dataset.name.split(" ").join("-")
        // const dir = __dirname +"\\..\\"+ process.env.ECG_PATH +"\\"+ datasetRep
        // if (!fs.existsSync(dir)){
        //     fs.mkdirSync(dir, { recursive: true });
        // }
    } catch (error) {
        res.status(500).json({message: error})
        const deletedMetadata = await MetadataModel.deleteOne({_id: newMetadata._id})
    }
}

// Modifier une pathologie
module.exports.updateOneDataset = async(req, res) => {
    try {
        const updatedDataset = await DatasetModel.findByIdAndUpdate(
            {_id: req.params.datasetId},
            {$set: {
                name: req.body.name,
                description: req.body.description,
        }},
        { new: true, upset: true, setDefaultsOnInsert: true }
        )
            const updatedMetadata = await MetadataModel.findByIdAndUpdate(
                {_id: updatedDataset.metadata_id},
                {
                    $set: {
                        last_updated_by: req.params.updaterId
                    }
                },
                { new: true, upset: true, setDefaultsOnInsert: true }
            )
        if (updatedDataset) {
            res.status(200).json({updatedDataset, updatedMetadata})     
        } else {
            res.status(400).json({message: 'Id inexistant'})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

// SUPPRESSION DES DONNEES TECHNIQUES DES ECGS IMPOSSIBLE pour patient aussi *

// Supprimer une pathologie
module.exports.removeOneDataset = async(req, res) => {
    try {
        const oneDataset = await DatasetModel.findById(req.params.datasetId)
        if (oneDataset) {
            const deletedDataset = await DatasetModel.deleteOne({_id:req.params.datasetId})
            const deletedMetadata = await MetadataModel.deleteOne({_id: oneDataset.metadata_id})
            const deletedEcgs = await EcgModel.deleteMany({dataset_name: oneDataset.name})
            //const deletedMetadataEcgs = await MetadataModel.remove({_id: })
            res.status(200).json('Suppression de la pathologie ' +oneDataset.name+ ' avec succès...')           
    
        } else {
            res.status(400).send({message: 'Id inexistant'})
        }
    
    } catch (error) {
        res.status(500).send({message: error})
    }   
}