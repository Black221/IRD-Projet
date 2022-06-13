const EcgModel = require('../models/EcgModel');
const MetadataModel = require('../models/MetadataModel');
const validId = require('mongoose').Types.ObjectId;

/**
 * @description - This controller is used to list all ecg .
 */
module.exports.getAllEcg = async(req, res) => {
        try {
            const ecgData = await EcgModel.find();
            res.status(200).json(ecgData);
        } catch (error) {
            res.status(500).json({
                message: error
            });
        }
    }
    /**
     * @description - This controller is used to get ecg by id.
     * @param {string} id - The id of ecg.
     * chekc if id is valid before doing anything else.
     */
module.exports.getEcgById = async(req, res) => {
        if (!validId.isValid(req.params.id))
            return res.status(400).json({
                message: 'Invalid id'
            });

        try {
            const ecgData = await EcgModel.findById({
                _id: req.params.id
            });
            res.status(200).json(ecgData);

        } catch (error) {
            res.status(500).json({
                message: error
            });
        }
    }
    /**
     * @description - This controller permits us to post or create new ecg.
     */
module.exports.postOneEcg = async(req, res) => {
        try {
            const metadataId = await new MetadataModel({
                created_by: req.body.created_by,
                last_updated_by: req.body.last_updated_by,
            });
            const metadataIdSave = await metadataId.save();

            const ecgId = await new EcgModel({
                nameDataset: req.body.nameDataset,
                metadata_id: metadataIdSave.id,
                patient_id: req.body.patient_id,
                numberEcg: req.body.numberEcg,
                filename: req.body.filename,
                state: req.body.state
            });
            const ecgIdSave = await ecgId.save();
            res.status(200).json(ecgIdSave);
            const filepath = ecgIdSave.filename + "_" + ecgIdSave.id + ".pdf";
            const numberEcg = ecgIdSave.id;
            const ecgIdSaveFilepath = await EcgModel.findByIdAndUpdate({
                _id: ecgIdSave.id
            }, { $set: { filepath: filepath, numberEcg: numberEcg } }, { new: true });
            res.status(200).json(ecgIdSaveFilepath);

        } catch (error) {
            res.status(500).json({
                message: error
            });
        }

    }
    /**
     * @description - This controller permits us to update ecg.
     * @param {string} id - The id of ecg.
     */
module.exports.updateEcg = async(req, res) => {
        if (!validId.isValid(req.params.id))
            return res.status(400).json({
                message: 'Invalid id'
            });

        try {
            const ecgData = await EcgModel.findByIdAndUpdate({
                _id: req.params.id
            }, req.body, {
                new: true
            });
            res.status(200).json(ecgData);
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    }
    /**
     * @description - This controller permits us to delete ecg.
     * @param {string} id - The id of ecg.
     */

module.exports.deleteEcg = async(req, res) => {
    if (!validId.isValid(req.params.id))
        return res.status(400).json({
            message: 'Invalid id'
        });

    try {
        const ecgData = await EcgModel.findByIdAndDelete({
            _id: req.params.id
        });
        res.status(200).json(ecgData);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}