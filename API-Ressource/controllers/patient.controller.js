const patientModel = require('../models/PatientModel');
const manageId = require('mongoose').Types.ObjectId;

/**
 * @description - This controller is used to list all patients in a pathology  .
 */
module.exports.getAllPatients = async(req, res) => {
    try {
        const patientData = await patientModel.find();
        res.status(200).json(patientData);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

/**
 * @description - This controller is used to find a patient by id.
 */
module.exports.getSinglePatient = async(req, res) => {
        if (!manageId.isValid(req.params.id))
            return res.status(400).json({
                message: 'Id entered is incorrect'
            });

        try {
            const patientData = await patientModel.findById({
                _id: req.params.id
            });
            res.status(200).json(patientData);

        } catch (error) {
            res.status(500).json({
                message: error
            });
        }
    }
    /**
     * @description - This controller permits us to record a patient.
     */
module.exports.recordPatient = async(req, res) => {
    try {
        const newPatient = await new patientModel({
            name: req.body.name,
            surname: req.body.surname,
            dateOfBirth: req.body.dateOfBirth,
            CNI: req.body.CNI,
            nationality: req.body.nationality,
            sex: req.body.sex,
            state: req.body.state //non necessaire
        });
        const savePatientData = await newPatient.save();
        res.status(200).json(savePatientData);

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/**
 * @description - This controller permits us to update a patient .
 * @param {string} id - The id of patient .
 * chekc if id is valid before doing anything else.         
 */
module.exports.upadatePatient = async(req, res) => {
    if (!manageId.isValid(req.params.id))
        return res.status(400).json({
            message: 'Id  is incorrect'
        });
    try {
        const patientData = await patientModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }); // changer new
        res.status(200).json(patientData); 
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/**
 * @description - This controller permits us to delete a patient .
 */

module.exports.deletePatient = async(req, res) => {
    if (!manageId.isValid(req.params.id))
        return res.status(400).json({
            message: 'Id  is incorrect'
        });
    try {
        const patientData = await patientModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json(patientData); // patienData 
    } catch (error) {
        res.status(500).json({ message: error });
    }

}