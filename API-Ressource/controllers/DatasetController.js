const DatasetModel = require("../models/DatasetModel")
const MetadataModel = require("../models/MetadataModel")


// Afficher toutes les pathologies
module.exports.getAllDataset = async(req, res) => {
    try {
        const allDataset = await DatasetModel.find()
        res.status(200).json({allDataset})      
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
    const metadata = new MetadataModel({
        created_by: req.body.creater,
        last_updated_by: req.body.creater
    })
    const newMetadata = await metadata.save()
    const newDataset = new DatasetModel({
        name: req.body.name,
        metadata_id: newMetadata._id,
        description: req.body.description
    })
    newDataset.save().then(data => res.status(200).send(data)).catch(err => res.send(500, 'Echec lors de l\'insertion de la pathologie dans la base de donnée'))
}

// Modifier une pathologie
module.exports.updateOneDataset = async(req, res) => {
    try {
        const updatedDataset = await DatasetModel.findByIdAndUpdate(
            {_id: req.params.datasetId},
            {$set: {
                name: req.body.name,
                description: req.body.description,
        }})
            const updatedMetadata = await MetadataModel.findByIdAndUpdate(
                {_id: updatedDataset.metadata_id},
                {
                    $set: {
                        last_updated_by: req.body.updater
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

// Supprimer une pathologie
module.exports.removeOneDataset = async(req, res) => {
    try {
        const oneDataset = await DatasetModel.findById(req.params.datasetId)
        if (oneDataset) {
            const deletedDataset = await DatasetModel.remove({_id:req.params.datasetId})
            res.status(200).json('Suppression de la pathologie ' +deletedDataset.name+ ' avec succès...')           
    
        } else {
            res.status(400).send({message: 'Id inexistant'})
        }
    
    } catch (error) {
        res.status(500).send({message: error})
    }   
}
