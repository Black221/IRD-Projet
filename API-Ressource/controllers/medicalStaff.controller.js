const MedicalStaffModel = require('../models/MedicalStaffModel');
const MetadataModel = require('../models/MetadataModel');
const manageId = require('mongoose').Types.ObjectId;



/**
 * @description - This controller is used to list all medical staff by id.
 * @param getterId wait before to  add this
 */
 module.exports.getAllMedicalStaff = async(req, res) => {
   
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
    const medicalStaffId = req.params.medicalStaffId
    if (!manageId.isValid(medicalStaffId)) return res.status(400).json({message: 'Id entered is incorrect'});


    try {
        const medicalStaffData = await MedicalStaffModel.findById({_id:medicalStaffId });
        const metadata = await MetadataModel.findById({_id: medicalStaffData.metadata_id})
        res.status(200).json({medicalStaffData, metadata});
    } catch (error) {
        res.status(500).json({message: error});
        console.log(error)
    }
}


/**
 * @description - This controller permits us to post or create new medical staff.
 * @param createrId
 */
module.exports.postOneMedicalStaff = async(req, res) => {
    try {
        // const present = await MedicalStaffModel.findOne({_id: req.params.createrId})
        //if (!present) return res.status(400).send('Personnel inexistant')
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
            created_by: req.params.createrId,
            last_updated_by: req.params.createrId
        })
        const saveMetadata = await metadata.save()
        const medicalStaffData = await MedicalStaffModel.findByIdAndUpdate(
            {_id: saveMedicalStaff._id},
            { $set: {metadata_id: metadata._id}}
        )
        res.status(200).json({medicalStaffData, saveMetadata});
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
 module.exports.updateMedicalStaff = async(req, res) => { // PROBLEME ICI

    if (!manageId.isValid(req.params.medicalStaffId)) return res.status(400).json({message: 'Id  is incorrect'});
    const updater = await MedicalStaffModel.findById({_id: req.params.updaterId})
    if(!updater) return res.status(400).json({message: 'Personnel inexistant'})

    try {
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
module.exports.deleteMedicalStaff = async(req, res) => { // PROBLEME ICI
    if (!manageId.isValid(req.params.medicalStaffId)) return res.status(400).json({message: 'Id  is incorrect'});
    try {
        const medicalStaff = await MedicalStaffModel.findById({ _id: req.params.medicalStaffId});
        const medicalStaffData = await MedicalStaffModel.findByIdAndDelete({ _id: req.params.medicalStaffId});
        const metadata = await MetadataModel.findByIdAndDelete({_id: medicalStaff.metadata_id})
        res.status(200).json({medicalStaffData, metadata});
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }

}