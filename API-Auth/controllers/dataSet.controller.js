const DataSetModel = require('../models/dataSet.model');
const MetadataModel = require('../models/metadata.model');

const ObjectID = require('mongoose').Types.ObjectId;


module.exports.getAllDataSet = async (req, res) => {
    try {
        const dataSet = await DataSetModel.find();
        res.status(200).json({dataset: dataSet});
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.getDataSet = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const dataSet = await DataSetModel.findById({_id: req.params.id})
        const metadata = await MetadataModel.findById({_id: dataSet.metadata});
        res.status(200).json({dataset: dataSet, metadata: metadata});
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.addDataSet = async (req, res) => {
    try {
        const metadata = new MetadataModel({
            created_by: req.body.created_by,
            last_update_by: req.body.created_by
        });
        const newMetadata = await metadata.save();
        const dataSet = new DataSetModel({
            metadata: newMetadata._id,
            description: req.body.description,
            acquisition_date: req.body.acquisition_date,
            leads: req.body.leads,
            study: req.body.study,
            source:req.body.source
        });
        const newDataSet = await dataSet.save();
        res.send(newDataSet);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.updateDataSet = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const updatedDataSet = await DataSetModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    description: req.body.description,
                    acquisition_date: req.body.acquisition_date,
                    leads: req.body.leads,
                    study: req.body.study,
                    source:req.body.source
                }
            },
            { new: true, upset: true, setDefaultsOnInsert: true }
        )
        const updatedMetadata = await MetadataModel.findByIdAndUpdate(
            {_id: updatedDataSet.metadata},
            {
                $set: {
                    last_update_by: req.body.last_update_by,
                }
            },
            { new: true, upset: true, setDefaultsOnInsert: true }
        )
        res.status(200).json({dataset: updatedDataSet, metadata: updatedMetadata});
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.deleteDataSet = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await DataSetModel
            .remove({_id: req.params.id})
            .exec();
        res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(500).send('Unknown request');
    }
}