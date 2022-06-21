const DatasetModel = require("../models/DatasetModel")
const EcgModel = require("../models/EcgModel")
const MetadataModel = require("../models/MetadataModel")
const MedicalStaffModel = require("../models/MedicalStaffModel")
const EcgMetadataModel = require("../models/EcgMetadataModel")
const fs = require("fs")

// Afficher toutes les pathologies
module.exports.getAllDataset = async(req, res) => {
    const allDataset = await DatasetModel.find()
    try {
        if (allDataset) {
            res.status(200).json({ pathologies: allDataset })
        } else {
            res.status(200).json({ message: 'Aucune pathologie dans la base de donnée' })
        }
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

// Afficher une pathologie
module.exports.getOneDataset = async(req, res) => {
    try {
        const oneDataset = await DatasetModel.findById({ _id: req.params.datasetId })
        if (oneDataset) {
            const oneMetadata = await MetadataModel.findById({ _id: oneDataset.metadata_id })
            res.status(200).send({ pathologie: oneDataset, metadata: oneMetadata })
        } else {
            res.status(400).send({ message: 'Pathologie inexistante' })
        }
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

// Ajouter une pathologie
module.exports.addOneDataset = async(req, res) => {
    const creater = await MedicalStaffModel.findById({ _id: req.params.createrId })
    if (!creater) return res.status(400).json('Personnel inexistant')
    try {
        const newDataset = new DatasetModel({
            name: req.body.name,
            description: req.body.description
        })
        const metadata = new MetadataModel({
            created_by: req.params.createrId,
            last_updated_by: req.params.createrId
        })
        const data = await newDataset.save()
        const newMetadata = await metadata.save()
        const datasetRep = data.name.split(" ").join("-") + "_" + data._id
        const dir = `${__dirname}${process.env.SE}..${process.env.SE}ECG${process.env.SE}${datasetRep}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const updatedDataset = await DatasetModel.findByIdAndUpdate({ _id: data._id }, {
            $set: {
                path: dir,
                metadata_id: newMetadata._id
            }
        })
        res.status(200).send({ pathologie: updatedDataset, metadata: newMetadata })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

// Modifier une pathologie
module.exports.updateOneDataset = async(req, res) => {
    const updater = await MedicalStaffModel.findById({ _id: req.params.updaterId })
    if (!updater) return res.status(400).json('Personnel inexistant')
    try {
        const dataset = await DatasetModel.findById({ _id: req.params.datasetId })
        if (!dataset) return res.status(400).send('Pathologie inexistante')
        const updatedDataset = await DatasetModel.findByIdAndUpdate({ _id: req.params.datasetId }, {
            $set: {
                name: req.body.name,
                description: req.body.description,
            }
        }, { new: true, upset: true, setDefaultsOnInsert: true })
        const updatedMetadata = await MetadataModel.findByIdAndUpdate({ _id: updatedDataset.metadata_id }, {
            $set: {
                last_updated_by: req.params.updaterId
            }
        }, { new: true, upset: true, setDefaultsOnInsert: true })
        if (dataset.name != updatedDataset.name) {
            const oldDir = dataset.path
            const datasetRep = updatedDataset.name.split(" ").join("-") + "_" + updatedDataset._id
            const dir = `${__dirname}${process.env.SE}..${process.env.SE}ECG${process.env.SE}${datasetRep}`

            if (!fs.existsSync(oldDir)) {
                fs.mkdirSync(dir, { recursive: true });
            } else {
                fs.rename(oldDir, dir)
            }
            await DatasetModel.findByIdAndUpdate({ _id: updatedDataset._id }, { $set: { path: dir } })
        }
        res.status(200).json({ pathologie: updatedDataset, metadata: updatedMetadata })

    } catch (error) {
        res.status(500).send(error)
    }
}

// SUPPRESSION DES DONNEES TECHNIQUES DES ECGS IMPOSSIBLE pour patient aussi *

// Supprimer une pathologie
module.exports.removeOneDataset = async(req, res) => {
    try {
        const oneDataset = await DatasetModel.findById({ _id: req.params.datasetId })
        if (!oneDataset) return res.status(400).send({ message: 'Pathologie inexistante' })

        await DatasetModel.deleteOne({ _id: req.params.datasetId })
        await MetadataModel.deleteOne({ _id: oneDataset.metadata_id })
        const allEcgs = await EcgModel.find({ dataset_id: oneDataset._id })
        allEcgs.forEach(ecg => {
            MetadataModel.deleteOne({ _id: ecg.metadata_id })
            EcgMetadataModel.deleteOne({ ecg_id: ecg._id })
        });
        await EcgModel.deleteMany({ dataset_id: oneDataset._id })
        res.status(200).json({ message: 'Suppression de la pathologie ' + oneDataset.name + ' avec succès...' })

        fs.rmdir(oneDataset.path, { recursive: true },
            (error => {
                if (error) {
                    console.log(error);
                } else {
                    console.log({ message: "Suppression du repertoire et des sous repertoires" })
                }
            }))
    } catch (error) {
        res.status(500).send({ message: error })
    }
}