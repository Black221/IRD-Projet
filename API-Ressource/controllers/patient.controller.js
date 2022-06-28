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
    // const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json({ message: 'Personnel inexistant !' })
    // if (getter.permission != 'admin') return res.status(400).json({ message: 'Personnel non autorisé !' })
    // if (getter.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    try {
        const patientData = await PatientModel.find({
            state: true
        });
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
    // const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    // const getter2 = await AssistantModel.findOne({ _id: req.params.getterId })
    const onePatient = await PatientModel.findById({ _id: req.params.patientId })
    if (!onePatient) return res.status(404).json({ message: 'Patient inexistant !' })
    if (onePatient.state == false) return res.status(404).json({ message: 'Patient inactif' })

    // if (getter) {
    //     if (getter.permission === "user" || (getter.permission != "admin" && getter._id != onePatient.doctor_id)) return res.status(400).json({ message: 'Personnel non autorisé !' })
    //     if (getter2.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    // } else {
    //     if (getter2) {
    //         if (getter2.doctor_id != onePatient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
    //         if (getter2.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    //     } else {
    //         return res.status(400).json({ message: 'Personnel inexistant !' })
    //     }
    // }
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
    if (doctor.state == false) return res.status(404).json({ message: 'Personnel inactif' })

    // const getter = await MedicalStaffModel.findOne({ _id: req.params.getterId })
    // const getter2 = await AssistantModel.findOne({ _id: req.params.getterId })
    // if (getter) {
    //     if (getter._id != req.params.doctorId && getter.permission != "admin") return res.status(400).json({ message: 'Personnel non autorisé !' })
    //     if (getter.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    // } else {
    //     if (getter2) {
    //         if (getter2.doctor_id != req.params.doctorId) return res.status(400).json({ message: 'Personnel non autorisé !' })
    //         if (getter2.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    //     } else {
    //         return res.status(400).json({ message: 'Personnel inexistant !' })
    //     }
    // }

    try {
        const patientData = await PatientModel.find({ doctor_id: req.params.doctorId }, {
            state: true
        });
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
        if (creater.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })

    } else {
        if (!creater2) return res.status(400).json({ message: 'Personnel inexistant !' })
        if (creater2.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    }

    try {
        if (creater) {
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
            const savePatientData = await newPatient.save();
            const firstname = savePatientData.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
            const lastname = savePatientData.lastname.toUpperCase()
            const numberPatient = savePatientData._id;
            const patientRecorded = await PatientModel.findByIdAndUpdate({ _id: numberPatient }, { $set: { numberPatient: numberPatient, firstname: firstname, lastname: lastname } }, { new: true });
            res.status(200).json({ patient: patientRecorded })

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
            const savePatientData = await newPatient.save();
            const firstname = savePatientData.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
            const lastname = savePatientData.lastname.toUpperCase()
            const numberPatient = savePatientData._id;
            const patientRecorded = await PatientModel.findByIdAndUpdate({ _id: numberPatient }, { $set: { numberPatient: numberPatient, firstname: firstname, lastname: lastname } }, { new: true });
            res.status(200).json({ patient: patientRecorded })
        }

    } catch (error) {
        res.status(500).send({ message: error });
        console.log(error);
    }
}

/**
 * @description - This controller permits us to update a patient .
 * @param {string} patientId - The id of patient .
 * chekc if id is valid before doing anything else.         
 */
module.exports.updatePatient = async(req, res) => {
        // const updater = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
        // const updater2 = await AssistantModel.findOne({ _id: req.params.updaterId })
        const onePatient = await PatientModel.findById({ _id: req.params.patientId })
        if (!onePatient) return res.status(404).json({ message: 'Patient inexistant !' })
        if (onePatient.state == false) return res.status(404).json({ message: 'Patient inactif' })


        // if (updater) {
        //     if (updater.permission === "user" || (updater.permission != "admin" && updater._id != onePatient.doctor_id)) return res.status(400).json({ message: 'Personnel non autorisé !' })
        //     if (updater.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
        // } else {
        //     if (updater2) {
        //         if (updater2.doctor_id != onePatient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
        //         if (updater2.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
        //     } else {
        //         return res.status(400).json({ message: 'Personnel inexistant !' })
        //     }
        // }

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
            console.log("Free SENEGAL!!!!!")
            const firstname = patientData.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
            const lastname = patientData.lastname.toUpperCase()
            const finalUpdatePatient = await PatientModel.findByIdAndUpdate({ _id: req.params.patientId }, {
                $set: {
                    firstname: firstname,
                    lastname: lastname
                }
            })
            return res.status(200).json({ patient: finalUpdatePatient })
        } catch (error) {
            res.status(500).json({ message: error })
            console.log(error);

        }
    }
    /**
     * @description - This controller permits us to update a patient .
     * @param {string} patientId - The id of patient .
     * chekc if id is valid before doing anything else.         
     */
module.exports.updateOnDeleteCascade = async(req, res) => {
    // const updater = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
    // const updater2 = await AssistantModel.findOne({ _id: req.params.updaterId })
    const onePatient = await PatientModel.findById({ _id: req.params.patientId })
    if (!onePatient) return res.status(404).json({ message: 'Patient inexistant !' })
    if (onePatient.state == false) return res.status(404).json({ message: 'Patient inactif' })


    // if (updater) {
    //     if (updater.permission === "user" || (updater.permission != "admin" && updater._id != onePatient.doctor_id)) return res.status(400).json({ message: 'Personnel non autorisé !' })
    //     if (updater.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    // } else {
    //     if (updater2) {
    //         if (updater2.doctor_id != onePatient.doctor_id) return res.status(400).json({ message: 'Personnel non autorisé !' })
    //         if (updater2.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    //     } else {
    //         return res.status(400).json({ message: 'Personnel inexistant !' })
    //     }
    // }

    try {
        const patientExists = await PatientModel.findById({ _id: req.params.patientId })
        if (!patientExists) return res.status(404).json({
            message: 'Le patient que vous souhaitez modifier n\'existe pas !'
        })
        const patientData = await PatientModel.findByIdAndUpdate({ _id: req.params.patientId }, {
            $set: {
                onDeletecascade: req.body.onDeleteCascade
            }
        })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error);

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
    // const updater = await MedicalStaffModel.findById({ _id: req.params.updaterId })
    // if (!updater) return res.status(400).json('Personnel inexistant')
    // if (updater.state == false) return res.status(404).json({ message: 'Personnel medical inactif' })
    const doctor = await MedicalStaffModel.findById({ _id: req.params.doctorId })
    if (!doctor) return res.status(400).json('Personnel inexistant')
    if (doctor.state == false) return res.status(404).json({ message: 'Personnel medical inactif' })
    const patient = await PatientModel.findById({ _id: req.params.patientId })
    if (!patient) return res.status(400).json('Patient inexistant')
    if (patient.state == false) return res.status(404).json({ message: 'Patient inactif' })


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
    // const deleter = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
    // const deleter2 = await AssistantModel.findOne({ _id: req.params.deleterId })
    // if (deleter) {
    //     if (deleter.permission === 'user')
    //         return res.status(400).json({ message: 'Personnel non autorisé !' })
    //     if (deleter.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    // } else {
    //     if (!deleter2) return res.status(400).json({ message: 'Personnel inexistant !' })
    //     if (deleter.state == false) return res.status(400).json({ message: 'Personnel medical inactif !' })
    // }

    try {
        const patientExists = await PatientModel.findById({ _id: req.params.patientId })
        if (!patientExists) return res.status(404).json({
            message: 'Le patient que vous souhaitez supprimer n\'existe pas !'
        })
        if (patientExists.state == false) return res.status(404).json({ message: 'Patient inactif' })

        // check if personnel  wants to make ecg of the patients to false . If yes , then change them status to false else  change just patient's status to false.
        await PatientModel.findByIdAndUpdate({ _id: req.params.patientId }, {
            $set: {
                state: false
            }
        })
        if (req.body.onDeleteCascade == true) {

            const patientECG = await EcgModel.find({ patient_id: req.params.patientId })
            if (patientECG) {
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
        } else {
            return res.status(200).json({
                message: "Archivage du patient " + patientExists.firstname + " " + patientExists.lastname + " avec succès !"
            })

        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}