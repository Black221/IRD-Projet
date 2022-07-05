const EcgModel = require('../models/EcgModel');
const MetadataModel = require('../models/MetadataModel');
const PatientModel = require('../models/PatientModel');
const MedicalStaffModel = require('../models/MedicalStaffModel');
const ExamTypeModel = require('../models/ExamTypeModel')
module.exports.getAllMedicalStaff = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const medicalStaffs = await MedicalStaffModel.find({ state: false })
        if (medicalStaffs.length == 0) return res.status(404).json({ message: 'Aucun personnel medical !' })
        res.status(200).json({ medicalStaffs: medicalStaffs })
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports.getAllPatient = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const patients = await PatientModel.find({ state: false }).populate("metadata_id").populate("antecedent.personnal").populate("symptom")
        if (patients.length == 0) return res.status(404).json({ message: 'Aucun patient !' })

        res.status(200).json({ patients: patients })
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports.getAllEcg = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const ecgs = await EcgModel.find({ state: false }).populate("metadata_id")
        if (ecgs.length == 0) return res.status(404).json({ message: 'Aucun patient !' })

        res.status(200).json({ ecgs: ecgs })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getAllExamType = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const examTypes = await ExamTypeModel.find({ state: false })
        if (examTypes.length == 0) return res.status(404).json({ message: 'Aucun type d\'examen !' })
        res.status(200).json({ examTypes: examTypes })
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


module.exports.getOnePatient = async(req, res) => {
    // const getter = await MedicalStaffModel.findById({ _id: req.params.getterId })
    // if (!getter) return res.status(400).json('Personnel inexistant')
    // if (getter.permission != "admin") return res.status(400).json('Personnel non autorisé')

    try {
        const patient = await PatientModel.findById({ _id: req.params.patientId }).populate("metadata_id").populate("antecedent.personnal").populate("symptom");
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
        const ecg = await EcgModel.findById({ _id: req.params.ecgId }).populate("metadata_id");
        if (!ecg) return res.status(400).json('Personnel medical inexistant')
        if (ecg.state == true) return res.status(400).json('ECG non archivé')
        res.status(200).json({ ecg: ecg });
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
            }
            return res.status(200).json({
                message: "Désarchivage du patient " + patientExists.firstname + " " + patientExists.lastname + "  et de ses ECGs avec succès !"
            })

        } else {
            return res.status(200).json({
                message: "Désarchivage du patient " + patientExists.firstname + " " + patientExists.lastname + " avec succès ! Il n'y a pas d'ECG pour ce patient !"
            })
        }

    } catch (error) {
        res.status(500).json({ message: error })
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

module.exports.restoreExamType = async(req, res) => {
    const examType = await ExamTypeModel.findById({_id: req.params.examTypeId})
    if(!examType) return res.status(404).json({message: "Type d'examen inexistant !"})
    
    await ExamTypeModel.findByIdAndUpdate({ _id: req.params.examTypeId }, {
        $set: {
            state: true
        }
    })
    res.status(200).json("Désarchivage du type d'examen " + examType.examType + " avec succès !")
}