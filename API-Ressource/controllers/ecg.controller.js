const DatasetModel = require('../models/DatasetModel');
const EcgMetadataModel = require('../models/EcgMetadataModel');
const EcgModel = require('../models/EcgModel');
const MetadataModel = require('../models/MetadataModel');
const PatientModel = require('../models/PatientModel');
const MedicalStaffModel = require('../models/MedicalStaffModel');
const AssistantModel = require('../models/AssistantModel');
const fs = require('fs');
require('dotenv').config({ path: '../config/.env' });

const validId = require('mongoose').Types.ObjectId;

/**
 * @description - This controller is used to list all ecg .
 */
module.exports.getAllEcg = async(req, res) => {
    const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    if (!getter) return res.status(400).json({ message: 'Personnel inexistant !' })
    if (getter.permission != 'admin' && getter.permission != 'user') return res.status(400).json({ message: 'Personnel non autorisé !' })
    if (getter.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    try {
        const allEcg = await EcgModel.find({ state: true });
        if (allEcg.length == 0) return res.status(404).json({ message: 'Aucun ECG !' })

        res.status(200).json({ ecgs: allEcg });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// datasetName
module.exports.getEcgByDataset = async(req, res) => {
    const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    if (!getter) return res.status(400).json({ message: 'Personnel inexistant !' })
    if (getter.permission != 'admin' && getter.permission != 'user') return res.status(400).json({ message: 'Personnel non autorisé !' })
    if (getter.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    const dataset = DatasetModel.find({
        _id: req.params.datasetId
    })
    if (!dataset) return res.status(404).json({ message: 'Pathologie inexistante !' })
    try {
        const allEcgByDataset = await EcgModel.find({ dataset_id: req.params.datasetId });
        res.status(200).json({ ecgs: allEcgByDataset });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


module.exports.getEcgByPatient = async(req, res) => {
    const patient = PatientModel.find({
        _id: req.params.patientId
    })
    if (!patient) return res.status(404).json({ message: 'Patient inexistant !' })
    if (patient.state == false) return res.status(400).json({ message: 'Patient inactif !' })
    const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    const getter2 = await AssistantModel.findOne({ _id: req.params.getterId })
    if (getter) {
        if (getter.permission != 'admin' && getter._id != patient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
        if (getter.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    } else {
        if (getter2) {
            if (getter2.doctor_id != patient.doctor_id) {
                return res.status(400).json({ message: 'Personnel non autorisé !' })
            }
            if (getter2.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
        } else
            return res.status(400).json({ message: 'Personnel inexistant !' })
    }
    try {
        const allEcgByPatient = await EcgModel.find({ patient_id: req.params.patientId });
        res.status(200).json({ ecgs: allEcgByPatient });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}



/**
 * @description - This controller is used to get ecg by id.
 * @param {string} ecgId - The id of ecg.
 * check if id is valid before doing anything else.
 */
module.exports.getOneEcg = async(req, res) => {
    const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    const getter2 = await AssistantModel.findOne({ _id: req.params.getterId })
    if (!getter && !getter2) return res.status(400).json('Personnel inexistant')
    if (getter.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    if (getter2.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    try {
        const oneEcg = await EcgModel.findById({ _id: req.params.ecgId });
        if (!oneEcg) return res.status(404).json({ message: 'ECG inexistant !' })
        const oneEcgMetadata = await EcgMetadataModel.find({ ecg_id: oneEcg._id }, {
            state: true
        })
        const metadata = await MetadataModel.find({ _id: oneEcg.metadata_id }, {
            state: true
        })
        if (!oneEcgMetadata) return res.status(200).json({ ecg: oneEcg, metadata: metadata })
        res.status(200).json({ ecg: oneEcg, ecgMetadata: oneEcgMetadata, metadata: metadata });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


/**
 * @description - This controller permits us to post or create new ecg.
 * @params - createrId      datasetName     patientId
 */
module.exports.addOneEcg = async(req, res) => {
    try {
        const patient = PatientModel.find({
            _id: req.params.patientId
        })
        if (!patient) return res.status(404).json({ message: 'Patient inexistant !' })
        if (patient.state == false) return res.status(400).json({ message: 'Patient inactif !' })
        const dataset = DatasetModel.find({
            _id: req.params.datasetId
        })
        if (!dataset) return res.status(404).json({ message: 'Pathologie inexistante !' })

        const creater = await MedicalStaffModel.findOne({ _id: req.params.createrId })
        const creater2 = await AssistantModel.findOne({ _id: req.params.createrId })
        if (creater) {
            if (creater.permission != 'admin' && creater._id != patient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
            if (creater.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
        } else {
            if (creater2) {
                if (creater2.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
                if (creater2.doctor_id != patient.doctor_id) {
                    return res.status(400).json({ message: 'Personnel non autorisé !' })
                } else
                    return res.status(400).json({ message: 'Personnel inexistant !' })

            }
        }

        const ecgId = new EcgModel({
            dataset_id: req.params.datasetId,
            metadata_id: metadataIdSave.id,
            patient_id: req.params.patientId
        });
        const ecgIdSave = await ecgId.save();

        const filename = ecgIdSave._id + "_" + patient._id
        const patientRep = patient._id + "_" + dataset._id
        const dir = `${dataset.path}${process.env.SE}${patientRep}`
        const filepath = `${dir}${process.env.SE}${filename}`

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const numberEcg = ecgIdSave._id;
        const ecgIdSaveFilepath = await EcgModel.findByIdAndUpdate({ _id: ecgIdSave.id }, {
            $set: {
                filepath: filepath,
                numberEcg: numberEcg,
                filename: filename
            }
        }, { new: true });
        const metadataId = new MetadataModel({
            created_by: req.params.createrId,
            last_updated_by: req.params.createrId
        });
        const metadataIdSave = await metadataId.save();
        res.status(200).json({ ecg: ecgIdSaveFilepath, metadata: metadataId });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }

}


/**
 * @description - This controller permits us to update ecg.
 * @param {string} ecgId - The id of ecg.
 * updaterId/:datasetName/:patientId/:ecgId
 */
module.exports.updateOneEcg = async(req, res) => {
    const patient = PatientModel.find({
        _id: req.params.patientId
    })
    if (!patient) return res.status(404).json({ message: 'Patient inexistant !' })
    const dataset = DatasetModel.find({
        _id: req.params.datasetId
    })
    if (!dataset) return res.status(404).json({ message: 'Pathologie inexistante !' })

    const updater = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
    const updater2 = await AssistantModel.findOne({ _id: req.params.updaterId })
    if (updater) {
        if (updater.permission != 'admin' && updater._id != patient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
    } else {
        if (updater2.doctor_id != patient.doctor_id) {
            return res.status(400).json({ message: 'Personnel non autorisé !' })
        } else
            return res.status(400).json({ message: 'Personnel inexistant !' })
    }

    try {
        const ecg = await EcgModel.findById({ _id: req.params.ecgId })
        if (!ecg) return res.status(404).json({ message: 'ECG inexistant !' })

        const oldFilepath = ecg.filepath
        const updatedEcg = await EcgModel.findByIdAndUpdate({ _id: req.params.ecgId }, {
            $set: {
                dataset_id: req.params.datasetId,
                patient_id: req.params.patientId
            }
        })

        const filename = updatedEcg._id + "_" + patient._id
        const patientRep = patient._id + "_" + dataset._id
        const dir = `${dataset.path}${process.env.SE}${patientRep}`
        const filepath = `${dir}${process.env.SE}${filename}`


        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.unlink(oldFilepath, err => {
            console.error(err);
        })
        const updatedEcgFilepath = await EcgModel.findByIdAndUpdate({ _id: updatedEcg.id }, {
            $set: {
                filepath: filepath,
                filename: filename
            }
        }, { new: true });

        const updatedEcgMetadata = await EcgMetadataModel.findOneAndUpdate({ ecg_id: req.params.ecgId }, {
            $set: {
                recording: req.body.recording,
                patient: req.body.patient
            }
        })
        const updatedMetadata = await MetadataModel.findByIdAndUpdate({ _id: updatedEcg.metadata_id }, {
            $set: {
                last_updated_by: req.params.updaterId
            }
        }, { new: true, upset: true, setDefaultsOnInsert: true })
        res.status(200).json({
            ecg: updatedEcgFilepath,
            ecgMetadata: updatedEcgMetadata,
            metadata: updatedMetadata
        })
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}


/**
 * @description - This controller permits us to delete ecg.
 * @param {string} ecgId - The id of ecg.
 */

module.exports.deleteOneEcg = async(req, res) => {
    const ecg = await EcgModel.findById({ _id: req.params.ecgId })
    if (!ecg) return res.status(404).json({ message: 'ECG inexistant !' })
    const patient = await PatientModel.findById({ _id: ecg.patient_id })
    const updater = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
    const updater2 = await AssistantModel.findOne({ _id: req.params.updaterId })
    if (updater) {
        if (updater.permission != 'admin' && updater._id != patient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
    } else {
        if (updater2.doctor_id != patient.doctor_id) {
            return res.status(400).json({ message: 'Personnel non autorisé !' })
        } else
            return res.status(400).json({ message: 'Personnel inexistant !' })
    }

    try {
        await EcgModel.findByIdAndUpdate({ _id: req.params.ecgId }, {
            $set: {
                state: false
            }
        });
        await EcgMetadataModel.findOneAndUpdate({ ecg_id: req.params.ecgId }, {
            $set: {
                state: false
            }
        });
        await MetadataModel.findByIdAndUpdate({ _id: ecg.metadata_id }, {
            $set: {
                state: false
            }
        })

        res.status(200).json({
            message: "Archivage de l'ECG " + ecg.filename + " avec succès !"
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
}