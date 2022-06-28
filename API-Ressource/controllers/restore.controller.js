const EcgMetadataModel = require('../models/EcgMetadataModel');
const EcgModel = require('../models/EcgModel');
const MetadataModel = require('../models/MetadataModel');
const PatientModel = require('../models/PatientModel');
const MedicalStaffModel = require('../models/MedicalStaffModel');
const AssistantModel = require('../models/AssistantModel');

module.exports.getAllMedicalStaff = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const medicalStaff = await MedicalStaffModel.find({ state: false })
        if (medicalStaff.length == 0) return res.status(404).json({ message: 'Aucun personnel medical !' })
        res.status(200).json({ medicalStaff: medicalStaff })
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports.getAllPatient = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const patients = await PatientModel.find({ state: false })
        if (patients.length == 0) return res.status(404).json({ message: 'Aucun patient !' })

        res.status(200).json({ patients: patients })
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports.getAllAssistant = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const assistants = await AssistantModel.find({ state: false })
        if (assistants.length == 0) return res.status(404).json({ message: 'Aucun assistant !' })

        res.status(200).json({ assistants: assistants })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getAllEcg = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const ecgs = await EcgModel.find({ state: false })
        if (ecgs.length == 0) return res.status(404).json({ message: 'Aucun patient !' })

        res.status(200).json({ ecgs: ecgs })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getOneMedicalStaff = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const medicalStaffData = await MedicalStaffModel.findById({ _id: req.params.medicalStaffId });
        if (!medicalStaffData) return res.status(400).json('Personnel medical inexistant')
        if (medicalStaffData.state == true) return res.status(400).json('Personnel medical non archivé')
        res.status(200).json({ personnel_medical: medicalStaffData });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }

}
module.exports.getOneAssistant = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const asistant = await AssistantModel.findById({ _id: req.params.assistantId });
        if (!asistant) return res.status(400).json('Personnel medical inexistant')
        if (asistant.state == true) return res.status(400).json('Personnel medical non archivé')
        res.status(200).json({ assistant: asistant });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }

}
module.exports.getOnePatient = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const patient = await PatientModel.findById({ _id: req.params.patientId });
        if (!patient) return res.status(400).json('Personnel medical inexistant')
        if (patient.state == true) return res.status(400).json('Patient non archivé')
        res.status(200).json({ patient: patient });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }

}
module.exports.getOneEcg = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const ecg = await EcgModel.findById({ _id: req.params.ecgId });
        if (!ecg) return res.status(400).json('Personnel medical inexistant')
        if (ecg.state == true) return res.status(400).json('ECG non archivé')
        const ecgMetadata = await EcgMetadataModel.findOne({ ecg_id: ecg._id });
        if (!ecgMetadata) return res.status(200).json({ ecg: ecg });
        res.status(200).json({ ecg: ecg, ecgMetadata: ecgMetadata });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }

}

module.exports.restoreMedicalStaff = async(req, res) => {
    // const present = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
    // if (!present) return res.status(400).send('Personnel inexistant')
    // if (present.permission != 'admin') return res.status(400).send('Permission non accordée')
    try {
        const medicalStaff = await MedicalStaffModel.findById({ _id: req.params.medicalStaffId });
        if (!medicalStaff) return res.status(400).json('Personnel medical inexistant')
        await MedicalStaffModel.findByIdAndUpdate({ _id: req.params.medicalStaffId }, { $set: { state: true } });

        await PatientModel.find({ doctor_id: req.params.medicalStaffId }).updateMany({ doctor_id: req.params.medicalStaffId }, {
            $set: { state: false }
        })
        await AssistantModel.find({ doctor_id: req.params.medicalStaffId }).updateMany({ doctor_id: req.params.medicalStaffId }, {
            $set: { state: false }
        })

        res.status(200).json("Désarchivage du personnel medical " + medicalStaff.firstname + " " + medicalStaff.lastname + " avec succès !")

    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
}

module.exports.restorePatient = async(req, res) => {
    // const present = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
    // if (!present) return res.status(400).send('Personnel inexistant')
    // if (present.permission != 'admin') return res.status(400).send('Permission non accordée')

    try {
        const patientExists = await PatientModel.findById({ _id: req.params.patientId })
        if (!patientExists) return res.status(404).json({
                message: 'Le patient que vous souhaitez supprimer n\'existe pas !'
            })
            // check if personnel  wants to make ecg of the patients to true . If yes , then change them status to true else  change just patient's status to false.
        await PatientModel.findByIdAndUpdate({ _id: req.params.patientId }, {
            $set: {
                state: true
            }
        })
        if (req.body.onDeleteCascade == true) {

            const patientECG = await EcgModel.find({ patient_id: req.params.patientId })
            if (patientECG.length > 0) {
                for (let i = 0; i < patientECG.length; i++) {
                    await EcgModel.findByIdAndUpdate({ _id: patientECG[i]._id }, {
                            $set: {
                                state: true
                            }
                        })
                        //make true also metadata of ecg and ecgMetadata
                    await MetadataModel.findByIdAndUpdate({ _id: patientECG[i].metadata_id }, {
                        $set: {
                            state: true
                        }
                    })
                    await EcgMetadataModel.findByIdAndUpdate({ ecg_id: patientECG[i]._id }, {
                        $set: {
                            state: true
                        }
                    })
                }
                return res.status(200).json({
                    message: "Désarchivage du patient " + patientExists.firstname + " " + patientExists.lastname + "  et de ses ECGs avec succès !"
                })

            } else {
                return res.status(200).json({
                    message: "Désarchivage du patient " + patientExists.firstname + " " + patientExists.lastname + " avec succès ! Il n'y a pas d'ECG pour ce patient !"
                })
            }
        } else {
            return res.status(200).json({
                message: "Désarchivage du patient " + patientExists.firstname + " " + patientExists.lastname + " avec succès !"
            })

        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports.restoreAssistant = async(req, res) => {
    // const present = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
    // if (!present) return res.status(400).send('Personnel inexistant')
    // if (present.permission != 'admin') return res.status(400).send('Permission non accordée')
    try {
        const assistant = await AssistantModel.findById({ _id: req.params.assistantId });
        if (!assistant) return res.status(400).json('Personnel medical inexistant')
        await AssistantModel.findByIdAndUpdate({ _id: req.params.assistantId }, { $set: { state: true } });

        res.status(200).json("Désarchivage du personnel medical " + assistant.firstname + " " + assistant.lastname + " avec succès !")

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports.restoreEcg = async(req, res) => {
    const ecg = await EcgModel.findById({ _id: req.params.ecgId })
    if (!ecg) return res.status(404).json({ message: 'ECG inexistant !' })
        // const present = await MedicalStaffModel.findOne({ _id: req.params.deleterId })
        // if (!present) return res.status(400).send('Personnel inexistant')
        // if (present.permission != 'admin') return res.status(400).send('Permission non accordée')

    try {
        await EcgModel.findByIdAndUpdate({ _id: req.params.ecgId }, {
            $set: {
                state: true
            }
        });
        await EcgMetadataModel.findOneAndUpdate({ ecg_id: req.params.ecgId }, {
            $set: {
                state: true
            }
        });
        await MetadataModel.findByIdAndUpdate({ _id: ecg.metadata_id }, {
            $set: {
                state: true
            }
        })

        res.status(200).json({
            message: "Désarchivage de l'ECG " + ecg.filename + " avec succès !"
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
}