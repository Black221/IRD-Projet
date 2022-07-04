const EcgModel = require('../models/EcgModel');
const MetadataModel = require('../models/MetadataModel');
const PatientModel = require('../models/PatientModel');
const MedicalStaffModel = require('../models/MedicalStaffModel');
const fs = require('fs');
require('dotenv').config({ path: '../config/.env' });


/**
 * @description - This controller is used to list all ecg .
 */
module.exports.getAllEcg = async(req, res) => {
    try {
        const allEcg = await EcgModel.find({ state: true }).populate('metadata_id');
        if (allEcg.length == 0) return res.status(404).json({ message: 'Aucun ECG !' })

        res.status(200).json({ ecgs: allEcg });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports.getEcgByPatient = async(req, res) => {
    const patient = await PatientModel.findOne({
        _id: req.params.patientId
    })
    if (!patient) return res.status(404).json({ message: 'Patient inexistant !' })
    if (patient.state == false) return res.status(400).json({ message: 'Patient inactif !' })

    try {
        const allEcgByPatient = await EcgModel.find({ patient_id: req.params.patientId, state: true }).populate('metadata_id');
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
    try {
        const oneEcg = await EcgModel.findById({ _id: req.params.ecgId, state: true }).populate('metadata_id');
        if (!oneEcg) return res.status(404).json({ message: 'ECG inexistant !' })
        if (oneEcg.state == false) return res.status(404).json({ message: "ECG inactif" })
        res.status(200).json({ ecg: oneEcg });
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


/**
 * @description - This controller permits us to post or create new ecg.
 * @params - createrId      datasetName     patientId
 */
module.exports.addOneEcg = async(req, res) => {
    try {
        const patient = await PatientModel.findOne({
            _id: req.params.patientId
        })
        if (!patient) return res.status(400).json({ message: 'Patient inexistant !' })
        if (patient.state == false) return res.status(400).json({ message: 'Patient inactif !' })

        const creater = await MedicalStaffModel.findOne({ _id: req.params.createrId, state: true })
        if (!creater) return res.status(400).json({ message: 'Personnel medical inexistant !' })
        const ecgId = new EcgModel({
            patient_id: req.params.patientId
        })

        const ecgIdSave = await ecgId.save()
            //first check number of ecg of this patient by id ECG1_nomPatient
            //  if number of ecg is  0 name of ecg is ECG1_nomPatient else increment number of ecg and affect this to nextNumber ecg
            //  name of ecg is ECG+`${nextNumberecg}`+_nomPatient
            //ECG_idECG_idPatient
        const ecgCurrentNumber = await EcgModel.countDocuments({ patient_id: req.params.patientId, state: true })

        const name = `ECG_${ecgCurrentNumber++}_${patient.firstname}_${patient.lastname}`
        const filename = `ECG_${ecgIdSave._id}_${patient._id}`
        const path = __dirname + process.env.SE + ".." + process.env.SE + ".." + process.env.SE + "platform" + process.env.SE + "src" + process.env.SE + "assets" + process.env.SE + "ECG" + process.env.SE + ""
        const dir = `${path}${process.env.SE}${name}`
        const filepath = `${path}${process.env.SE}${filename}`

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const metadataId = new MetadataModel({
            created_by: req.params.createrId,
            last_updated_by: req.params.createrId
        });
        const metadataIdSave = await metadataId.save();
        const ecgIdSaveFilepath = await EcgModel.findByIdAndUpdate({ _id: ecgIdSave._id }, {
            $set: {
                filepath: filepath,
                filename: filename,
                metadata_id: metadataIdSave._id,
                name: name
            }
        }, { new: true });
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
    const patient = await PatientModel.find({
        _id: req.params.patientId
    })
    if (!patient) return res.status(404).json({ message: 'Patient inexistant !' })
    if (patient.state == false) return res.status(400).json({ message: 'Patient inactif !' })

    try {
        const ecg = await EcgModel.findById({ _id: req.params.ecgId })
        if (!ecg) return res.status(404).json({ message: 'ECG inexistant !' })

        const oldFilepath = ecg.filepath
        const updatedEcg = await EcgModel.findByIdAndUpdate({ _id: req.params.ecgId }, {
            $set: {
                patient_id: req.params.patientId
            }
        })

        const ecgCurrentNumber = await EcgModel.countDocuments({ patient_id: req.params.patientId, state: true })

        const name = `ECG_${ecgCurrentNumber++}_${patient.firstname}_${patient.lastname}`
        const filename = `ECG_${ecgIdSave._id}_${patient._id}`
        const path = __dirname + process.env.SE + ".." + process.env.SE + ".." + process.env.SE + "platform" + process.env.SE + "src" + process.env.SE + "assets" + process.env.SE + "ECG" + process.env.SE + ""
        const dir = `${path}${process.env.SE}${name}`
        const filepath = `${path}${process.env.SE}${filename}`

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.unlink(oldFilepath, err => {
            console.error(err);
        })
        const updatedEcgFilepath = await EcgModel.findByIdAndUpdate({ _id: updatedEcg._id }, {
            $set: {
                filepath: filepath,
                filename: filename,
                name: name
            }
        }, { new: true });

        const updater = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
        if (!updater) return res.status(404).json({ message: 'Personnel medical inexistant !' })

        const updatedMetadata = await MetadataModel.findByIdAndUpdate({ _id: updatedEcg.metadata_id }, {
            $set: {
                last_updated_by: req.params.updaterId
            }
        }, { new: true, upset: true, setDefaultsOnInsert: true })
        res.status(200).json({
            ecg: updatedEcgFilepath,
            metadata: updatedMetadata
        })
    } catch (err) {
        res.status(500).json({
            message: err
        });
        console.log(err)
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
    if (!patient) return res.status(404).json({ message: 'Patient inexistant !' })
    if (patient.state == false) return res.status(400).json({ message: 'Patient inactif !' })

    // Qui dois archiver ?
    const deleter = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
    if (!deleter) return res.status(404).json({ message: 'Personnel medical inexistant !' })
    if (deleter.permission != "admin") return res.status(400).json({ message: 'Permission non accordée !' })

    try {
        await EcgModel.findByIdAndUpdate({ _id: req.params.ecgId }, {
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