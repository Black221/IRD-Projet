const medicalStaffModel = require('../models/MedicalStaffModel');
const manageId = require('mongoose').Types.ObjectId;

/**
 * @description - This controller is used to list all medical staff by id.
 */
module.exports.getAllMedicalStaff = async(req, res) => {
    try {
        const medicalStaffData = await medicalStaffModel.find();
        res.status(200).json(medicalStaffData);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    } 
}

/**
 * @description - This controller is used to get a medical staff by id.
 */
module.exports.getMedicalStaffById = async(req, res) => {
        if (!manageId.isValid(req.params.id))
            return res.status(400).json({
                message: 'Id entered is incorrect'
            });

        try {
            const medicalStaffData = await medicalStaffModel.findById({
                _id: req.params.id
            });
            res.status(200).json(medicalStaffData);

        } catch (error) {
            res.status(500).json({
                message: error
            });
        }
    }
    /**
     * @description - This controller permits us to post or create new medical staff.
     */
module.exports.postOneMedicalStaff = async(req, res) => {
    try {
        const newMedicalStaff = await new medicalStaffModel({
            name: req.body.name,
            surname: req.body.surname,
            dateOfBirth: req.body.dateOfBirth,
            cni: req.body.cni,
            nationality: req.body.nationality,
            sex: req.body.sex,
            login: req.body.login,
            password: req.body.password,
            profession: req.body.profession,
            permission: req.body.permission,
            state: req.body.state 
        });
        const saveMedicalStaff = await newMedicalStaff.save();
        res.status(200).json(saveMedicalStaff);

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/**
 * @description - This controller permits us to update medical staff.
 * @param {string} id - The id of medical staff.
 * chekc if id is valid before doing anything else.         
 */
module.exports.updateMedicalStaff = async(req, res) => {
    if (!manageId.isValid(req.params.id))
        return res.status(400).json({
            message: 'Id  is incorrect'
        });
    try {
        const medicalStaffData = await medicalStaffModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json(medicalStaffData);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/**
 * @description - This controller permits us to delete medical staff.
 */

module.exports.deleteMedicalStaff = async(req, res) => {
    if (!manageId.isValid(req.params.id))
        return res.status(400).json({
            message: 'Id  is incorrect'
        });
    try {
        const medicalStaffData = await medicalStaffModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json(medicalStaffData);
    } catch (error) {
        res.status(500).json({ message: error });
    }

}