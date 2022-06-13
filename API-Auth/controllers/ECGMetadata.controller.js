const ECGMetadataModel = require('../models/ECGMetadata.model');
const MetadataModel = require('../models/metadata.model');

const ObjectID = require('mongoose').Types.ObjectId;

module.exports.addECGMetadata = async (req, res) => {
    try {
        const metadata = new MetadataModel({
            created_by: req.body.created_by,
            last_update_by: req.body.created_by
        });
        const newMetadata = await metadata.save();
        const ECGMetadata = new ECGMetadataModel({
            ECG: req.body.ECG,
            metadata: newMetadata._id,
            recording: req.body.recording,
            measurements: req.body.measurements,
            patient: req.body.patient,
            annotations: req.body.annotations,
            treatment: req.body.treatment,
            additional_information: req.body.additional_information
        });
        const newECGMetadata = await ECGMetadata.save();
        res.status(200).json({ECGMetadata: newECGMetadata});
    } catch (err) {
        res.status(500).json({message: err});
    }
}

module.exports.updateECGMetadata = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const updatedECGMetadata = await ECGMetadataModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    recording: req.body.recording,
                    measurements: req.body.measurements,
                    patient: req.body.patient,
                    annotations:req.body.annotations,
                    treatment: req.body.treatment,
                    additional_information: req.body.additional_information
                }
            },
            { new: true, upset: true, setDefaultsOnInsert: true }
        );
        const updatedMetadata = await MetadataModel.findByIdAndUpdate(
            {_id: updatedECGMetadata.metadata},
            {
                $set: {
                    last_update_by: req.body.last_update_by,
                }
            },
            { new: true, upset: true, setDefaultsOnInsert: true }
        );
        res.status(200).json({ECGMetadata: updatedECGMetadata, metadata: updatedMetadata});
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.deleteECGMetadata = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await ECGMetadataModel
            .remove({_id: req.params.id})
            .exec();
        res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(500).send('Unknown request');
    }
}