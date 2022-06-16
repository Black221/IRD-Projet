const MedicalStaffModel = require('../models/MedicalStaffModel');
const MetadataModel = require('../models/MetadataModel');
const manageId = require('mongoose').Types.ObjectId;

/**
 * @description - This controller is used to list all medical staff by id.
 * @param getterId 
 */
module.exports.getAllMedicalStaff = async(req, res) => {
    const present = await MedicalStaffModel.findOne({_id: req.params.getterId})
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin') return res.status(400).send('Permission non accordée') 
    try {
        const medicalStaffData = await MedicalStaffModel.find();
        res.status(200).json(medicalStaffData);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    } 
}

/**
 * @description - This controller is used to get a medical staff by id.
 * @param getterId
 * @param medicalStaffId
 */
module.exports.getMedicalStaffById = async(req, res) => {  
    const present = await MedicalStaffModel.findOne({_id: req.params.getterId})
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin') return res.status(400).send('Permission non accordée') 
    
    if (!manageId.isValid(req.params.medicalStaffId)) return res.status(400).json({message: 'Id entered is incorrect'});

    try {
        const medicalStaffData = await MedicalStaffModel.findById({_id: req.params.medicalStaffId});
        const metadata = await MetadataModel.findById({_id: medicalStaffData.metadata_id})
        res.status(200).json({medicalStaffData, metadata});
    } catch (error) {
        res.status(500).json({message: error});
        console.log(error)
    }
}
    /**
     * @description - This controller permits us to post or create new medical staff.
     * @param posterId
     */
module.exports.postOneMedicalStaff = async(req, res) => {
    try {
        if (req.params.posterId) {
            console.log("zfGEBQEQRHBQRN")
            const present = await MedicalStaffModel.findOne({_id: req.params.posterId})
            console.log(present)
            if (!present) return res.status(400).send('Personnel inexistant')
            if (present.permission != 'admin') return res.status(400).send('Permission non accordée') 
            const newMedicalStaff = await new MedicalStaffModel({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dateOfBirth: req.body.dateOfBirth,
                cni: req.body.cni,
                nationality: req.body.nationality,
                sex: req.body.sex,
                address:req.body.address,
                phone: req.body.phone,
                login: req.body.login,
                password: req.body.password,
                profession: req.body.profession,
                permission: req.body.permission
            });
            const saveMedicalStaff = await newMedicalStaff.save();
            const metadata = await new MetadataModel({
                created_by: req.params.posterId,
                last_updated_by: req.params.posterId
            })
            const saveMetadata = await metadata.save()
            const medicalStaffData = await MedicalStaffModel.findByIdAndUpdate(
                {_id: saveMedicalStaff._id},
                { $set: {metadata_id: metadata._id}}
            )
            res.status(200).json({medicalStaffData, saveMetadata});

        
        } else {
            const newMedicalStaff = await new MedicalStaffModel({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dateOfBirth: req.body.dateOfBirth,
                cni: req.body.cni,
                nationality: req.body.nationality,
                sex: req.body.sex,
                address:req.body.address,
                phone: req.body.phone,
                login: req.body.login,
                password: req.body.password,
                profession: req.body.profession
            });
            const saveMedicalStaff = await newMedicalStaff.save();
            const metadata = await new MetadataModel({
                created_by: saveMedicalStaff._id,
                last_updated_by: saveMedicalStaff._id
            })
            const saveMetadata = await metadata.save()
            const medicalStaffData = await MedicalStaffModel.findByIdAndUpdate(
                {_id: saveMedicalStaff._id},
                { $set: {metadata_id: metadata._id}}
            )
            res.status(200).json({medicalStaffData, saveMetadata});
        }

    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

/**
 * @description - This controller permits us to update medical staff.
 * @param updaterId
 * @param {string} medicalStaffId - The id of medical staff.
 * chekc if id is valid before doing anything else.         
 */
module.exports.updateMedicalStaff = async(req, res) => {

    if (!manageId.isValid(req.params.medicalStaffId)) return res.status(400).json({message: 'Id  is incorrect'});
    try {
        if (req.params.updaterId === req.params.medicalStaffId) {
            const medicalStaffData = await MedicalStaffModel.findByIdAndUpdate(
                { _id: req.params.medicalStaffId }, 
                {$set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    dateOfBirth: req.body.dateOfBirth,
                    cni: req.body.cni,
                    nationality: req.body.nationality,
                    sex: req.body.sex,
                    address:req.body.address,
                    phone: req.body.phone,
                    login: req.body.login,
                    password: req.body.password,
                    profession: req.body.profession    
            }});
            const updatedMetadata = await MetadataModel.findByIdAndUpdate(
                {_id: medicalStaffData.metadata_id},
                {$set: {last_updated_by: req.params.medicalStaffId}}
            )
            res.status(200).json({medicalStaffData, updatedMetadata});
    
        } else {
            const present = await MedicalStaffModel.findOne({_id: req.params.updaterId})
            if (!present) return res.status(400).send('Personnel inexistant')
            if (present.permission != 'admin') return res.status(400).send('Permission non accordée') 
            const medicalStaffData = await MedicalStaffModel.findByIdAndUpdate(
                { _id: req.params.medicalStaffId }, 
                {$set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    dateOfBirth: req.body.dateOfBirth,
                    cni: req.body.cni,
                    nationality: req.body.nationality,
                    sex: req.body.sex,
                    address:req.body.address,
                    phone: req.body.phone,
                    login: req.body.login,
                    password: req.body.password,
                    profession: req.body.profession,
                    permission: req.body.permission    
            }});
            const updatedMetadata = await MetadataModel.findByIdAndUpdate(
                {_id: medicalStaffData.metadata_id},
                {$set: {last_updated_by: req.params.updaterId}}
            )
            res.status(200).json({medicalStaffData, updatedMetadata});
        }
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

/**
 * @description - This controller permits us to delete medical staff.
 * @param deleterId
 * @param medicalStaffId
 */

module.exports.deleteMedicalStaff = async(req, res) => {
    if (!manageId.isValid(req.params.medicalStaffId)) return res.status(400).json({message: 'Id  is incorrect'});
    const present = await MedicalStaffModel.findOne({_id: req.params.deleterId})
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin') return res.status(400).send('Permission non accordée') 
    try {
        const medicalStaff = await MedicalStaffModel.findById({ _id: req.params.medicalStaffId});
        const medicalStaffData = await MedicalStaffModel.findByIdAndDelete({ _id: req.params.medicalStaffId});
        const metadata = await MetadataModel.findByIdAndDelete({_id: medicalStaff.metadata_id})
        res.status(200).json({medicalStaffData, metadata});
    } catch (error) {
        res.status(500).json({ message: error });
    }

}