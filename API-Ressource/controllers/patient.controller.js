const PatientModel = require('../models/PatientModel');
const ecgModel = require('../models/EcgModel');
const MetadataModel = require('../models/MetadataModel');
const MedicalStaffModel = require('../models/MedicalStaffModel');
const manageId = require('mongoose').Types.ObjectId;

/**
 * @description - This controller is used to list all patients in a pathology  .
 */
module.exports.getAllPatients = async(req, res) => {
        try {
            const patientData = await PatientModel.find();
            res.status(200).json({patients: patientData});

        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    /**
     * @description - This controller is used to find a patient by id.
     */
module.exports.getSinglePatient = async(req, res) => {
        if (!manageId.isValid(req.params.patientId)) return res.status(400).json({message: 'Id entered is incorrect'});

        try {
            const patientData = await PatientModel.findById({_id: req.params.patientId});
            const metadata = await MetadataModel.findById({_id: patientData.metadata_id})
            res.status(200).json({patient: patientData, metadata: metadata});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    /** 
     * @description - This controller permits us to record a patient.
     */
module.exports.recordPatient = async(req, res) => {
    const creater = await MedicalStaffModel.findById({_id: req.params.createrId})
    if(!creater) return res.status(400).json('Personnel inexistant')
    try {
        const newPatient = await new PatientModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dateOfBirth: req.body.dateOfBirth,
            cni: req.body.cni,
            nationality: req.body.nationality,
            sex: req.body.sex,
            address:req.body.address,
            phone: req.body.phone,
            doctor_id: req.params.createrId
        });
        const savePatientData = await newPatient.save();
        const metadata = await new MetadataModel({
            created_by: req.params.createrId,
            last_updated_by: req.params.createrId
        })
        const newMetadata = await metadata.save()

        const numberPatient = savePatientData.id;
        const patient = await PatientModel.findByIdAndUpdate(
            { _id: numberPatient }, 
            { $set: { 
                numberPatient: numberPatient,
                metadata_id: newMetadata._id
            }}, 
            { new: true }
        );
        res.status(200).json({patient: patient, metadata: metadata});
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

/**
 * @description - This controller permits us to update a patient .
 * @param {string} patientId - The id of patient .
 * chekc if id is valid before doing anything else.         
 */
module.exports.upadatePatient = async(req, res) => {
    const updater = await MedicalStaffModel.findById({_id: req.params.updaterId})
    if(!updater) return res.status(400).json('Personnel inexistant')
    if (!manageId.isValid(req.params.patientId))
        return res.status(400).json({
            message: 'Id  is incorrect'
        });
    try {
        const patientData = await PatientModel.findByIdAndUpdate(
            { _id: req.params.patientId }, 
            {$set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dateOfBirth: req.body.dateOfBirth,
                cni: req.body.cni,
                nationality: req.body.nationality,
                sex: req.body.sex,
                address:req.body.address,
                phone: req.body.phone
            }});
        const updatedMetadata = await MetadataModel.findByIdAndUpdate(
            {_id: patientData.metadata_id},
            {
                $set: {
                    last_updated_by: req.params.updaterId
                }
            },
            { new: true, upset: true, setDefaultsOnInsert: true }
        )    
        res.status(200).json({patient: patientData, metadata: updatedMetadata});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports.updateDoctor = async(req, res) => {
    const updater = await MedicalStaffModel.findById({_id: req.params.updaterId})
    if(!updater) return res.status(400).json('Personnel inexistant')
    const doctor = await MedicalStaffModel.findById({_id: req.params.doctorId})
    if(!doctor) return res.status(400).json('Personnel inexistant')
    if (!manageId.isValid(req.params.patientId))return res.status(400).json({message: 'Id  is incorrect'});

    try {
        const patientData = await PatientModel.findByIdAndUpdate(
            { _id: req.params.patientId }, 
            {$set: {
                doctor_id: req.params.doctorId
            }});
            const updatedMetadata = await MetadataModel.findByIdAndUpdate(
                {_id: patientData.metadata_id},
                {
                    $set: {
                        last_updated_by: req.params.updaterId
                    }
                },
                { new: true, upset: true, setDefaultsOnInsert: true }
            )    
            res.status(200).json({patient: patientData, metadata: updatedMetadata});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
/**
 * @description - This controller permits us to delete a patient .
 * @param {string} patientId - The id of patient .
 * chekc if id is valid before doing anything else.
 * @returns {object} - The patient deleted.
 * Then delete all ecgs associated with this patient.
 */

module.exports.deletePatient = async(req, res) => {
    if (!manageId.isValid(req.params.patientId))
        return res.status(400).json({message: 'Id  is incorrect'});
    try {
        const patientId = req.params.patientId;
        const patient = await PatientModel.findById({ _id: patientId })
        const patientData = await PatientModel.findByIdAndDelete({ _id: patientId });
        res.status(200).json(`Suppression du patient ${patient.firstname} ${patient.lastname}avec succès...`);
        await ecgModel.find({ patient_id: patientId }).deleteMany();
    } catch (error) {
        res.status(500).json({ message: error });
    }
}