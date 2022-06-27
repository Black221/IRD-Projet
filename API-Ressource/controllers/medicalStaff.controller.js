const MedicalStaffModel = require('../models/MedicalStaffModel')
const AssistantModel = require('../models/AssistantModel')
const PatientModel = require('../models/PatientModel')
    /**
     * @description get all medicalstaff
     * @param {*} req 
     * @param {*} res 
     * @param {*} getterId
     * @returns medicalStaffData
     */
module.exports.getAllMedicalStaff = async(req, res) => {
    try {
        const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
        if (!getter) return res.status(400).json({ message: 'Personnel inexistant' })
        if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')
        const medicalStaffData = await MedicalStaffModel.find()
        if (medicalStaffData.length == 0) return res.status(404).json({ message: 'Aucun personnel medical !' })
        res.status(200).json({ personnels_medicals: medicalStaffData })

    } catch (error) {
        res.status(500).json({
            message: error
        })

    }
}

/**
 * @description Get one medicalstaff by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} medicalStaffId
 * @param {*} getterId
 * @returns medicalStaffData
 */
module.exports.getMedicalStaffById = async(req, res) => {
    const present = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin') return res.status(400).send('Permission non accordée')

    try {
        const medicalStaffData = await MedicalStaffModel.findById({ _id: req.params.medicalStaffId });
        if (!medicalStaffData) return res.status(400).json('Personnel medical inexistant')
        res.status(200).json({ personnel_medical: medicalStaffData });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

/**
 * @description Add a new medicalstaff
 * @param {*} req 
 * @param {*} res 
 * @param {*} posterId
 * @returns medicalStaffData
 */
module.exports.postOneMedicalStaff = async(req, res) => {
    try {
        const present = await MedicalStaffModel.findOne({ _id: req.params.posterId })
        if (!present) return res.status(400).send('Personnel inexistant')
        if (present.permission != 'admin') return res.status(400).send('Permission non accordée')

        const newMedicalStaff = await new MedicalStaffModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthday: req.body.dateOfBirth,
            cni: req.body.cni,
            nationality: req.body.nationality,
            sex: req.body.sex,
            address: req.body.address,
            phone: req.body.phone,
            login: req.body.login,
            password: req.body.password,
            profession: req.body.profession,
            permission: req.body.permission
        });
        const saveMedicalStaff = await newMedicalStaff.save();

        const firstname = saveMedicalStaff.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        const lastname = saveMedicalStaff.lastname.toUpperCase()
        const medicalStaffData = await MedicalStaffModel.findByIdAndUpdate({ _id: saveMedicalStaff._id }, {
            $set: {
                firstname: firstname,
                lastname: lastname
            }
        })
        res.status(200).json({ personnel_medical: medicalStaffData });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

/**
 * @description Update a medicalstaff
 * @param {*} req 
 * @param {*} res 
 * @param {*} medicalStaffId
 * @param {*} updaterId
 * @returns 
 */
module.exports.updateMedicalStaff = async(req, res) => {

    const present = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin' || present.permission != 'doctor') return res.status(400).send('Permission non accordée')
    try {
        const medicalStaff = await MedicalStaffModel.findById({ _id: req.params.medicalStaffId });
        if (!medicalStaff) return res.status(400).json('Personnel medical inexistant')
        const medicalStaffData = await MedicalStaffModel.findByIdAndUpdate({ _id: req.params.medicalStaffId }, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthday: req.body.birthday,
                cni: req.body.cni,
                nationality: req.body.nationality,
                sex: req.body.sex,
                address: req.body.address,
                phone: req.body.phone,
                login: req.body.login,
                password: req.body.password,
                profession: req.body.profession
            }
        });
        const firstname = saveMedicalStaff.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        const lastname = saveMedicalStaff.lastname.toUpperCase()
        const updatedMedicalStaff = await MedicalStaffModel.findByIdAndUpdate({ _id: medicalStaffData._id }, {
            $set: {
                firstname: firstname,
                lastname: lastname
            }
        })
        res.status(200).json({ personnel_medical: updatedMedicalStaff });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

/**
 * @description Delete a medicalstaff
 * @param {*} req
 * @param {*} res
 * @param {*} medicalStaffId
 * @param {*} deleterId
 * @returns
 */

module.exports.deleteMedicalStaff = async(req, res) => {
    const present = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin') return res.status(400).send('Permission non accordée')
    try {
        const medicalStaff = await MedicalStaffModel.findById({ _id: req.params.medicalStaffId });
        if (!medicalStaff) return res.status(400).json('Personnel medical inexistant')
        await MedicalStaffModel.findByIdAndUpdate({ _id: req.params.medicalStaffId }, { $set: { state: false } });

        await PatientModel.findAndUpdate({ doctor_id: req.params.medicalStaffId }, {
            $set: { state: false }
        })
        await AssistantModel.findAndUpdate({ doctor_id: req.params.medicalStaffId }, {
            $set: { state: false }
        })

        res.status(200).json("Archivage du personnel medical " + medicalStaff.firstname + " " + medicalStaff.lastname + " avec succès !")

    } catch (error) {
        res.status(500).json({ message: error });
    }
}