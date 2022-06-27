const MedicalStaffModel = require('../models/MedicalStaffModel')
const MetadataModel = require('../models/MetadataModel')
const AssistantModel = require('../models/AssistantModel')

/**
 * @description Display all assistants.
 * @param {*} req 
 * @param {*} res 
 * @returns assisantData
 */
module.exports.getAllAssistant = async(req, res) => {
    try {
        const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
        if (!getter) return res.status(400).json({ message: 'Personnel inexistant' })
        if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')
        const assisantData = await AssistantModel.find({ state: true })
        if (assisantData.length == 0) return res.status(404).json({ message: 'Aucun assistant !' })

        res.status(200).json({ personnel_medical: assisantData })

    } catch (error) {
        res.status(500).json({
            message: error
        })

    }
}

/**
 * @description Get one assistant By Id.
 * @param {*} req 
 * @param {*} res 
 * @param {*} assistantId  
 * @param {*} getterId
 * @returns assistantData
 */
module.exports.getAssistantById = async(req, res) => {
    const present = await AssistantModel.findOne({ _id: req.params.getterId })
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin') return res.status(400).send('Permission non accordée')
    if (present.state == false) return res.status(400).send('Personnel medical inactif')
    try {
        const assistantData = await AssistantModel.findById({ _id: req.params.assistantId });
        if (!assistantData) return res.status(400).json({ status: 'Personnel medical inexistant' })
        if (assistantData.state == false) return res.status(400).json({ status: 'Personnel medical inactif' })
        res.status(200).json({ personnel_medical: assistantData });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/**
 * @description add a new assistant
 * @param {*} req 
 * @param {*} res 
 * @param {*} posterId
 * @returns assistantData
 */
module.exports.postOneAssistant = async(req, res) => {
    try {
        const present = await MedicalStaffModel.findOne({ _id: req.params.posterId })
        if (!present) return res.status(400).send('Personnel inexistant')
        if (present.permission != 'admin') return res.status(400).send('Permission non accordée')
        if (present.state == false) return res.status(400).send('Personnel medical inactif')
        const doctor = await MedicalStaffModel.findById({ _id: req.params.doctorId })
        if (!doctor) return res.status(400).send('Personnel medical inexistant')
        if (doctor.state == false) return res.status(400).send('Personnel medical inactif')
        const newAssistant = await new AssistantModel({
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
            doctor_id: req.params.doctorId
        });
        const saveAssistant = await newAssistant.save();

        const saveMetadata = await metadata.save()
        const firstname = saveMedicalStaff.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        const lastname = saveMedicalStaff.lastname.toUpperCase()
        const assistantData = await AssistantModel.findByIdAndUpdate({ _id: saveAssistant._id }, {
            $set: {
                metadata_id: saveMetadata._id,
                firstname: firstname,
                lastname: lastname
            }
        })
        res.status(200).json({ personnel_medical: assistantData });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

/**
 * @description Update a assistant
 * @param {*} req 
 * @param {*} res 
 * @param {*} assistantId
 * @param {*} updaterId
 * @returns updatedAssistant
 */
module.exports.updateAssistant = async(req, res) => {
    const assistant = await AssistantModel.findById({ _id: req.params.assistantId });
    if (!assistant) return res.status(400).json('Personnel medical inexistant')
    if (assistant.state == false) return res.status(400).json('Personnel medical inactif')
    if (req.params.assistantId != req.params.updaterId) {
        const present = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
        if (!present) return res.status(400).send('Personnel inexistant')
        if (present.permission != 'admin') return res.status(400).send('Permission non accordée')
        if (present.state == false) return res.status(400).send('Personnel medical inactif')
    }
    try {
        const assistantData = await AssistantModel.findByIdAndUpdate({ _id: req.params.assistantId }, {
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
        const updatedAssistant = await AssistantModel.findByIdAndUpdate({ _id: assistantData._id }, {
            $set: {
                firstname: firstname,
                lastname: lastname
            }
        })
        res.status(200).json({ personnel_medical: updatedAssistant });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
module.exports.updateDoctor = async(req, res) => {
    const updater = await MedicalStaffModel.findById({ _id: req.params.updaterId })
    if (!updater) return res.status(400).json('Personnel inexistant')
    if (updater.state == false) return res.status(400).json('Personnel medical inactif')
    const doctor = await MedicalStaffModel.findById({ _id: req.params.doctorId })
    if (!doctor) return res.status(400).json('Personnel inexistant')
    if (doctor.state == false) return res.status(400).json('Personnel medical inactif')
    if (!manageId.isValid(req.params.assistantId)) return res.status(400).json({ message: 'Id  is incorrect' });

    try {
        const assistantData = await PatientModel.findByIdAndUpdate({ _id: req.params.assistantId }, {
            $set: {
                doctor_id: req.params.doctorId
            }
        });
        res.status(200).json({ assistant: assistantData });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


/**
 * @description Delete a assistant by Id
 * @param {*} req
 * @param {*} res
 * @param deleterId
 * @param assistantId
 * @returns true
 */

module.exports.deleteAssistant = async(req, res) => {
    const present = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
    if (!present) return res.status(400).send('Personnel inexistant')
    if (present.permission != 'admin') return res.status(400).send('Permission non accordée')
    if (present.state == false) return res.status(400).send('Personnel medical inactif')
    try {
        const assistant = await AssistantModel.findById({ _id: req.params.assistantId });
        if (!assistant) return res.status(400).json('Personnel medical inexistant')
        if (assistant.state == false) return res.status(400).json('Personnel medical inactif')
        await AssistantModel.findByIdAndUpdate({ _id: req.params.assistantId }, { $set: { state: false } });

        res.status(200).json("Archivage du personnel medical " + assistant.firstname + " " + assistant.lastname + " avec succès !")

    } catch (error) {
        res.status(500).json({ message: error });
    }
}