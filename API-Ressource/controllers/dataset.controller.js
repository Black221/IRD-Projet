const DatasetModel = require("../models/DatasetModel")
const MetadataModel = require("../models/MetadataModel")
const MedicalStaffModel = require("../models/MedicalStaffModel")
const fs = require("fs")
require('dotenv').config({ path: '../config/.env' });


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} getterId
 * @returns allDatasets
 */
module.exports.getAllDatasets = async(req, res) => {
    try {
        // const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
        // const getter2 = await AssistantModel.findOne({ _id: req.params.getterId })
        // if (!getter && !getter2) return res.status(400).json('Personnel inexistant')
        const allDatasets = await DatasetModel.find()
        if (allDatasets.length === 0) return res.status(404).json({ message: 'Aucune pathologie cardiaque !' })
        res.status(200).json({ pathologies: allDatasets })
    } catch (error) {
        res.status(500).json({ message: error })
    }

}

/**
 * @desription  get one dataset by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} getterId
 * @param {*} datasetId
 * @returns oneDataset
 */
module.exports.getOneDataset = async(req, res) => {
    // const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    // const getter2 = await AssistantModel.findOne({ _id: req.params.getterId })
    // if (!getter && !getter2) return res.status(400).json('Personnel inexistant')

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

/**
 * @description add a new dataset
 * @param {*} createrId
 * @param {*} req 
 * @param {*} res 
 * @returns updatedDataset newMetadata
 */
module.exports.addOneDataset = async(req, res) => {
    const creater = await MedicalStaffModel.findById({ _id: req.params.createrId })
    if (!creater) return res.status(400).json('Personnel inexistant')
    if (creater.permission != "admin") return res.status(400).json('Personnel non autorisé')
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
        const datasetRep = data._id
            //const dir = `${process.env.ECG_PATH}${process.env.SE}${datasetRep}`
        const path = __dirname + process.env.SE + ".." + process.env.SE + ".." + process.env.SE + "platform" + process.env.SE + "src" + process.env.SE + "assets" + process.env.SE + "ECG" + process.env.SE + "" + datasetRep

        console.log(path)
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const dir = "assets" + process.env.SE + "ECG" + process.env.SE + "" + datasetRep
            // const datasetName = data.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        const updatedDataset = await DatasetModel.findByIdAndUpdate({ _id: data._id }, {
            $set: {
                path: path,
                dir: dir,
                metadata_id: newMetadata._id
                    // name: datasetName
            }
        })
        res.status(200).send({ pathologie: updatedDataset, metadata: newMetadata })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

/**
 * @description update a dataset
 * @param {*} req 
 * @param {*} res 
 * @param {*} datasetId
 * @param {*} updaterId
 * @returns updatedDataset updatedMetadata
 */
module.exports.updateOneDataset = async(req, res) => {
    const updater = await MedicalStaffModel.findById({ _id: req.params.updaterId })
    if (!updater) return res.status(400).json('Personnel inexistant')
    if (updater.permission != "admin") return res.status(400).json('Personnel non autorisé')
    try {
        const dataset = await DatasetModel.findById({ _id: req.params.datasetId })
        if (!dataset) return res.status(400).send('Pathologie inexistante')
        const updatedDataset = await DatasetModel.findByIdAndUpdate({ _id: req.params.datasetId }, {
                $set: {
                    name: req.body.name,
                    description: req.body.description
                }
            }, { new: true, upset: true, setDefaultsOnInsert: true })
            // const datasetName = Dataset.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

        // const updatedDataset = await DatasetModel.findByIdAndUpdate({ _id: Dataset._id }, {
        //     $set: {
        //         name: datasetName
        //     }
        // })
        const updatedMetadata = await MetadataModel.findByIdAndUpdate({ _id: updatedDataset.metadata_id }, {
            $set: {
                last_updated_by: req.params.updaterId
            }
        }, { new: true, upset: true, setDefaultsOnInsert: true })
        res.status(200).json({ pathologie: updatedDataset, metadata: updatedMetadata })

    } catch (error) {
        res.status(500).send(error)
    }
}