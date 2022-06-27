const PatientModel = require('../models/PatientModel');
const EcgModel = require('../models/EcgModel');
const MedicalStaffModel = require('../models/MedicalStaffModel');
const AssistantModel = require('../models/AssistantModel');
const EcgMetadataModel = require('../models/EcgMetadataModel');
const MetadataModel = require('../models/MetadataModel');

/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.getAllPatients = async(req, res) => {
        const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
        if (!getter) return res.status(400).json({ message: 'Personnel inexistant !' })
        if (getter.permission != 'admin') return res.status(400).json({ message: 'Personnel non autorisé !' })
        try {
            const patientData = await PatientModel.find();
            if (patientData.length == 0) return res.status(404).json({ message: 'Aucun patient !' })
            res.status(200).json({
                patients: patientData
            });

        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    /**
     * @description - This controller is used to find a patient by id.
     */
module.exports.getSinglePatient = async(req, res) => {
    const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    const getter2 = await AssistantModel.findOne({ _id: req.params.getterId })
    const onePatient = await PatientModel.findById({ _id: req.params.patientId })
    if (!onePatient) return res.status(404).json({ message: 'Patient inexistant !' })

    if (getter) {
        if (getter.permission === "user" || (getter.permission != "admin" && getter._id != onePatient.doctor_id)) return res.status(400).json({ message: 'Personnel non autorisé !' })
    } else {
        if (getter2) {
            if (getter2.doctor_id != onePatient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
        } else {
            return res.status(400).json({ message: 'Personnel inexistant !' })
        }
    }
    try {
        res.status(200).json({
            patient: onePatient
        })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports.getPatientsByDoctorId = async(req, res) => {
    const doctor = await MedicalStaffModel.findOne({ _id: req.params.doctorId })
    if (!doctor) return res.status(400).json({ message: 'Personnel inexistant !' })

    const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    const getter2 = await AssistantModel.findOne({ _id: req.params.getterId })
    if (getter) {
        if (getter._id != req.params.doctorId && getter.permission != "admin") return res.status(400).json({ message: 'Personnel non autorisé !' })
    } else {
        if (getter2) {
            if (getter2.doctor_id != req.params.doctorId) return res.status(400).json({ message: 'Personnel non autorisé !' })
        } else {
            return res.status(400).json({ message: 'Personnel inexistant !' })
        }
    }

    try {
        const patientData = await PatientModel.find();
        if (patientData.length == 0) return res.status(404).json({ message: 'Aucun patient !' })
        res.status(200).json({
            patients: patientData
        });

    } catch (error) {
        res.status(500).json({ message: error });
    }
}




/** 
 * @description - This controller permits us to record a patient.
 */
module.exports.recordPatient = async(req, res) => {
    const creater = await MedicalStaffModel.findOne({ _id: req.params.createrId })
    const creater2 = await AssistantModel.findOne({ _id: req.params.createrId })
    if (creater) {
        if (creater.permission === 'user')
            return res.status(400).json({ message: 'Personnel non autorisé !' })

    } else {
        if (!creater2) return res.status(400).json({ message: 'Personnel inexistant !' })
    }

    try {
        if (creater.permission == 'admin' || creater.permission == 'doctor') {
            const newPatient = new PatientModel({
                antecedent_tab: req.body.antecedent_tab,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthday: req.body.birthday,
                cni: req.body.cni,
                nationality: req.body.nationality,
                sex: req.body.sex,
                address: req.body.address,
                phone: req.body.phone,
                doctor_id: req.params.createrId
            })
        } else {
            let doctorOfAssistant = await AssistantModel.findById({ _id: req.params.createrId })
            const newPatient = new PatientModel({
                antecedent_tab: req.body.antecedent_tab,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthday: req.body.birthday,
                cni: req.body.cni,
                nationality: req.body.nationality,
                sex: req.body.sex,
                address: req.body.address,
                phone: req.body.phone,
                doctor_id: doctorOfAssistant.doctor_id
            })
        }

        const savePatientData = await newPatient.save();
        const firstname = savePatientData.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        const lastname = savePatientData.lastname.toUpperCase()
        const numberPatient = savePatientData._id;
        const patientRecorded = await PatientModel.findByIdAndUpdate({ _id: numberPatient }, { $set: { numberPatient: numberPatient, firstname: firstname, lastname: lastname } }, { new: true });
        res.status(200).json({ patient: patientRecorded })
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

/**
 * @description - This controller permits us to update a patient .
 * @param {string} patientId - The id of patient .
 * chekc if id is valid before doing anything else.         
 */
module.exports.updatePatient = async(req, res) => {
    const updater = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
    const updater2 = await AssistantModel.findOne({ _id: req.params.updaterId })
    const onePatient = await PatientModel.findById({ _id: req.params.patientId })
    if (!onePatient) return res.status(404).json({ message: 'Patient inexistant !' })

    if (updater) {
        if (updater.permission === "user" || (updater.permission != "admin" && updater._id != onePatient.doctor_id)) return res.status(400).json({ message: 'Personnel non autorisé !' })
    } else {
        if (updater2) {
            if (updater2.doctor_id != onePatient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
        } else {
            return res.status(400).json({ message: 'Personnel inexistant !' })
        }
    }

    try {
        const patientExists = await PatientModel.findById({ _id: req.params.patientId })
        if (!patientExists) return res.status(404).json({
            message: 'Le patient que vous souhaitez modifier n\'existe pas !'
        })
        const patientData = await PatientModel.findByIdAndUpdate({ _id: req.params.patientId }, {
            $set: {
                antecedent_tab: req.body.antecedent_tab,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthday: req.body.birthday,
                cni: req.body.cni,
                nationality: req.body.nationality,
                sex: req.body.sex,
                address: req.body.address,
                phone: req.body.phone
            }
        })
        if (patientData.firstname != patientExists.firstname || patientData.lastname != patientExists.lastname) {
            const firstname = patientData.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
            const lastname = patientData.lastname.toUpperCase()
            const finalUpdatePatient = await PatientModel.findByIdAndUpdate({ _id: req.params.patientId }, {
                $set: {
                    firstname: firstname,
                    lastname: lastname
                }
            })
            return res.status(200).json({ patient: finalUpdatePatient })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

/**
 * @description - This controller permits us to change status of a patient to false.
 * @param {string} patientId - The id of patient .
 * @process 
 * . First check if permission is valid . Then check if patient exists . Now ask if
 * ask if personnel if he want to make ecg of the patients to false . If yes , then change them status to false else
 * change just patient's status to false.
 */
module.exports.updateDoctor = async(req, res) => {
    const updater = await MedicalStaffModel.findById({ _id: req.params.updaterId })
    if (!updater) return res.status(400).json('Personnel inexistant')
    const doctor = await MedicalStaffModel.findById({ _id: req.params.doctorId })
    if (!doctor) return res.status(400).json('Personnel inexistant')
    if (!manageId.isValid(req.params.patientId)) return res.status(400).json({ message: 'Id  is incorrect' });

    try {
        const patientData = await PatientModel.findByIdAndUpdate({ _id: req.params.patientId }, {
            $set: {
                doctor_id: req.params.doctorId
            }
        });
        const updatedMetadata = await MetadataModel.findByIdAndUpdate({ _id: patientData.metadata_id }, {
            $set: {
                last_updated_by: req.params.updaterId
            }
        }, { new: true, upset: true, setDefaultsOnInsert: true })
        res.status(200).json({ patient: patientData, metadata: updatedMetadata });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports.deletePatient = async(req, res) => {
    const deleter = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
    const deleter2 = await AssistantModel.findOne({ _id: req.params.deleterId })
    if (deleter) {
        if (deleter.permission === 'user')
            return res.status(400).json({ message: 'Personnel non autorisé !' })

    } else {
        if (!deleter2) return res.status(400).json({ message: 'Personnel inexistant !' })
    }

    try {
        const patientExists = await PatientModel.findById({ _id: req.params.patientId })
        if (!patientExists) return res.status(404).json({
                message: 'Le patient que vous souhaitez supprimer n\'existe pas !'
            })
            // check if personnel  wants to make ecg of the patients to false . If yes , then change them status to false else  change just patient's status to false.
        await PatientModel.findByIdAndUpdate({ _id: req.params.patientId }, {
            $set: {
                state: false
            }
        })
        if (req.body.onDeleteCascade == true) {

            const patientECG = await EcgModel.find({ patient_id: req.params.patientId })
            if (patientECG.length > 0) {
                for (let i = 0; i < patientECG.length; i++) {
                    await EcgModel.findByIdAndUpdate({ _id: patientECG[i]._id }, {
                            $set: {
                                state: false
                            }
                        })
                        //make false also metadata of ecg and ecgMetadata
                    await MetadataModel.findByIdAndUpdate({ _id: patientECG[i].metadata_id }, {
                        $set: {
                            state: false
                        }
                    })
                    await EcgMetadataModel.findByIdAndUpdate({ ecg_id: patientECG[i]._id }, {
                        $set: {
                            state: false
                        }
                    })
                }
                return res.status(200).json({
                    message: "Archivage du patient " + patientExists.firstname + " " + patientExists.lastname + "  et de ses ECGs avec succès !"
                })

            } else {
                return res.status(200).json({
                    message: "Archivage du patient " + patientExists.firstname + " " + patientExists.lastname + " avec succès ! Il n'y a pas d'ECG pour ce patient !"
                })
            }
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}