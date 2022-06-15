const patientModel = require('../models/PatientModel');
const ecgModel = require('../models/EcgModel');
const manageId = require('mongoose').Types.ObjectId;

/**
 * @description - This controller is used to list all patients in a pathology  .
 */
module.exports.getAllPatients = async(req, res) => {
        try {
            const patientData = await patientModel.find();
            res.status(200).json(patientData);

        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    /**
     * @description - This controller is used to find a patient by id.
     */
module.exports.getSinglePatient = async(req, res) => {
        if (!manageId.isValid(req.params.patientId))
            return res.status(400).json({
                message: 'Id entered is incorrect'
            });

        try {
            const patientData = await patientModel.findById({_id: req.params.patientId});
            res.status(200).json({patientData});

        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    /** 
     * @description - This controller permits us to record a patient.
     */
module.exports.recordPatient = async(req, res) => {
    try {
        const newPatient = await new patientModel({
            firstname: req.body.name,
            lastname: req.body.surname,
            dateOfBirth: req.body.dateOfBirth,
            cni: req.body.cni,
            nationality: req.body.nationality,
            sex: req.body.sex,
            address:req.body.address,
            phone: req.body.phone,
            doctor_id: req.params.createrId
        });
        const savePatientData = await newPatient.save();
        res.status(200).json(savePatientData);
        const numberPatient = savePatientData.id;
        await patientModel.findByIdAndUpdate(
            { _id: numberPatient }, 
            { $set: { numberPatient: numberPatient } }, 
            { new: true }
        );
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
    if (!manageId.isValid(req.params.patientId))
        return res.status(400).json({
            message: 'Id  is incorrect'
        });
    try {
        const patientData = await patientModel.findByIdAndUpdate(
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
                //doctor_id: plus tard   
            }});
        res.status(200).json(patientData);
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
        const patientData = await patientModel.findByIdAndDelete({ _id: patientId });
        res.status(200).json(patientData);
        await ecgModel.find({ patient_id: patientId }).deleteMany();
    } catch (error) {
        res.status(500).json({ message: error });
    }
}