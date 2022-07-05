const PatientModel = require('../models/PatientModel');
const EcgModel = require('../models/EcgModel');
const MedicalStaffModel = require('../models/MedicalStaffModel');
const MetadataModel = require('../models/MetadataModel');

/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

module.exports.getAllPatient = async(req, res) => {
    try {
        const patientData = await PatientModel.find({ state: true }).populate("metadata_id").populate("antecedent.personnal").populate("symptom");
        if (patientData.length == 0) return res.status(404).json({ message: 'Aucun patient !' })
        res.status(200).json({ patients: patientData });

    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
}

/**
 * @description - This controller is used to find a patient by id.
 */
module.exports.getOnePatient = async(req, res) => {
    const patientData = await PatientModel.findById({ _id: req.params.patientId }).populate("metadata_id").populate("antecedent.personnal").populate("symptom");
    if (!patientData) return res.status(404).json({ message: 'Patient inexistant !' })
    if (patientData.state == false) return res.status(404).json({ message: 'Patient inactif' })

    try {
        res.status(200).json({ patient: patientData });

    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
}


/** 
 * @description - This controller permits us to record a patient.
 */
module.exports.addOnePatient = async(req, res) => {
    const creater = await MedicalStaffModel.findOne({ _id: req.params.createrId })
    if (!creater) return res.status(400).send('Personnel inexistant')
    if (creater.state == false) return res.status(400).json({ message: 'Personnel medical inactif' })

    try {
        const newPatient = new PatientModel({
            antecedent: req.body.antecedent,
            symptom: req.body.symptom,
            firstname: req.body.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
            lastname: req.body.lastname.toUpperCase(),
            birthday: req.body.birthday,
            cni: req.body.cni,
            nationality: req.body.nationality,
            sex: req.body.sex,
            race: req.body.race,
            address: req.body.address,
            phone: req.body.phone,
            diagnostic: creater.permission != 'assistant' ? req.body.diagnostic : ""
        })
        const savePatientData = await newPatient.save();
        const newMetadata = new MetadataModel({
            created_by: req.params.createrId,
            last_updated_by: req.params.createrId
        })
        const metadata = await newMetadata.save()
        const patientData = await PatientModel.findByIdAndUpdate({ _id: savePatientData._id }, {
            $set: { metadata_id: metadata._id }
        })

        res.status(200).json({ patient: patientData })


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

module.exports.updateOnePatient = async(req, res) => {

    const patient = await PatientModel.findById({ _id: req.params.patientId })
    if (!patient) return res.status(404).json({ message: 'Patient inexistant !' })
    if (patient.state == false) return res.status(404).json({ message: 'Patient inactif' })

    const updater = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
    if (!updater) return res.status(400).send('Personnel inexistant')
    if (updater.state == false) return res.status(400).json({ message: 'Personnel medical inactif' })


    try {
        const patientData = await PatientModel.findByIdAndUpdate({ _id: req.params.patientId }, {
            $set: {
                antecedent: req.body.antecedent,
                symptom: req.body.symptom,
                firstname: req.body.firstname.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                lastname: req.body.lastname.toUpperCase(),
                birthday: req.body.birthday,
                cni: req.body.cni,
                nationality: req.body.nationality,
                sex: req.body.sex,
                race: req.body.race,
                address: req.body.address,
                phone: req.body.phone,
                diagnostic: updater.permission != 'assistant' ? req.body.diagnostic : ""
            }
        })
        await MetadataModel.findByIdAndUpdate({ _id: patientData.metadata_id }, {
            $set: {
                last_updated_by: req.params.updaterId
            }

        })
        return res.status(200).json({ patient: patientData })
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

module.exports.deleteOnePatient = async(req, res) => {
    const patient = await PatientModel.findById({ _id: req.params.patientId })
    if (!patient) return res.status(404).json({ message: 'Patient inexistant !' })
    if (patient.state == false) return res.status(404).json({ message: 'Patient inactif' })

    const deleter = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
    if (!deleter) return res.status(400).send('Personnel inexistant')
    if (deleter.permission != 'admin') return res.status(400).send('Permission non accordée')
    if (deleter.state == false) return res.status(400).json({ message: 'Personnel medical inactif' })

    try {
        await PatientModel.findByIdAndUpdate({ _id: req.params.patientId }, {
            $set: {
                state: false
            }
        })
        await MetadataModel.findByIdAndUpdate({ _id: patient.metadata_id }, {
            $set: {
                state: false
            }
        })

        const patientECG = await EcgModel.find({ patient_id: req.params.patientId })
        if (patientECG) {
            for (let i = 0; i < patientECG.length; i++) {
                await EcgModel.findByIdAndUpdate({ _id: patientECG[i]._id }, {
                    $set: {
                        state: false
                    }
                })
                await MetadataModel.findByIdAndUpdate({ _id: patientECG[i].metadata_id }, {
                    $set: {
                        state: false
                    }
                })
            }
            return res.status(200).json({message: "Archivage du patient " + patientExists.firstname + " " + patientExists.lastname + "  et de ses ECGs avec succès !"})
        } else {
            return res.status(200).json({message: "Archivage du patient " + patientExists.firstname + " " + patientExists.lastname + " avec succès !"})
        }
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error);
    }
}