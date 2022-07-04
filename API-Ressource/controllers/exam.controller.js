const examModel = require('../models/ExamModel')
const MetadataModel = require('../models/MetadataModel')
const PatientModel = require('../models/PatientModel')
const MedicalStaffModel = require('../models/MedicalStaffModel')
const ExamTypeModel = require('../models/ExamTypeModel')

// add - update - getOne
module.exports.getAllExam = async(req, res) => {
    try {
        const allExam = await examModel.find({ state: true }).populate('metadata_id')
        if (allExam.length == 0) return res.status(404).json({ message: 'Aucun Examen !' })
        res.status(200).json({ exams: allExam });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
module.exports.getOneExam = async(req, res) => {
    try {
        const oneExam = await examModel.findById({ _id: req.params.examId }).populate('metadata_id')
        if (!oneExam) return res.status(400).json({ message: 'Examen inexistant !' })
        if (oneExam.state == false) return res.status(400).json({ message: "Examen inactif !" })
        res.status(200).json({ exam: oneExam })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}
module.exports.addOneExam = async(req, res) => {
    try {
        const creater = await MedicalStaffModel.findOne({ _id: req.params.createrId })
        if (!creater) return res.status(400).json({ message: 'Personnel inexistant !' })
        if (creater.state == false) return res.status(400).json({ message: "Personnel inactif !" })
        const patient = await PatientModel.findOne({ _id: req.params.patientId })
        if (!patient) return res.status(400).json({ message: 'Patient inexistant !' })
        if (patient.state == false) return res.status(400).json({ message: 'Patient inactif !' })
        const examId = new examModel({
            patient_id: req.params.patientId,
            name: req.body.name
        })
        const examIdSave = await examId.save()
            //name : examIdSave.name_nomPatient
            // filename:nom_idExam_idPatient
        if (!examIdSave) return res.status(400).json({
            message: 'Examen non enregistre, Nom de l\'Examen Requise!'
        })
        const examType = await ExamTypeModel.findOne({ examType: examIdSave.name })
        if (!examType) {
            const examType = new ExamTypeModel({
                examType: examIdSave.name
            })
            await examType.save()
        }
        const examCurrentNumber = await examModel.countDocuments({ patient_id: req.params.patientId })
        const name = `${examIdSave.name}_${examCurrentNumber++}_${patient.firstname}_${patient.lastname}`
        const filename = `${examIdSave.name}_${examIdSave._id}_${patient._id}`
        const path = __dirname + process.env.SE + ".." + process.env.SE + ".." + process.env.SE + "platform" + process.env.SE + "src" + process.env.SE + "assets" + process.env.SE + "EXAMEN" + process.env.SE + ""
        const dir = `${path}${process.env.SE}${name}`
        const filepath = `${path}${process.env.SE}${filename}`

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const metadataId = new MetadataModel({
            created_by: req.params.createrId,
            last_updated_by: req.params.createrId
        });
        const metadataIdSave = await metadataId.save();

        const examIdSaveFilePath = await examModel.findByIdAndUpdate({ _id: examIdSave._id }, {
            metadata_id: metadataIdSave._id,
            filename: filename,
            filepath: filepath,
            name: name
        })
        res.status(200).json({ exam: examIdSaveFilePath, metadata: metadataId, message: 'Examen enregistre avec succes !' })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

module.exports.updateOneExam = async(req, res) => {
    const patient = await PatientModel.findOne({ _id: req.params.patientId })
    if (!patient) return res.status(400).json({ message: 'Patient inexistant !' })
    if (patient.state == false) return res.status(404).json({ message: 'Patient inactif !' })
    try {
        const exam = await examModel.findById({ _id: req.params.examId })
        if (!exam) return res.status(404).json({ message: 'EXAMEN INEXISTANT !' })
        if (exam.state == false) return res.status(404).json({ message: 'EXAMEN inactif !' })
        const oldFilePath = exam.filepath
        const updateExam = await examModel.findByIdAndUpdate({ _id: req.params.examId }, {
            $set: {
                patient_id: req.params.patientId
            }
        })
        const examCurrentNumber = await examModel.countDocuments({ patient_id: req.params.patientId })
        const name = `${updateExam.name}_${examCurrentNumber++}_${patient.firstname}_${patient.lastname}`
        const filename = `${updateExam.name}_${updateExam._id}_${patient._id}`
        const path = __dirname + process.env.SE + ".." + process.env.SE + ".." + process.env.SE + "platform" + process.env.SE + "src" + process.env.SE + "assets" + process.env.SE + "EXAMEN" + process.env.SE + ""
        const dir = `${path}${process.env.SE}${name}`
        const filepath = `${path}${process.env.SE}${filename}`

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.unlink(oldFilePath, err => {
            console.error(err);
        })
        const updatedExamFilePath = await examModel.findByIdAndUpdate({ _id: updateExam._id }, {
            $set: {
                filepath: filepath,
                filename: filename,
                name: name
            }
        }, { new: true })
        const updater = await MedicalStaffModel.findOne({ _id: req.params.updaterId })
        if (!updater) return res.status(404).json({ message: 'Personnel medical inexistant !' })
        const updatedMetadata = await MetadataModel.findByIdAndUpdate({ _id: updatedEcg.metadata_id }, {
            $set: {
                last_updated_by: req.params.updaterId
            }
        }, { new: true, upset: true, setDefaultsOnInsert: true })
        res.status(200).json({ exam: updatedExamFilePath, metadata: updatedMetadata, message: 'Examen mis a jour avec succes !' })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

module.exports.deleteOneExam = async(req, res) => {
    try {
        const deleter = await MedicalStaffModel.findOne({ _id: req.params.deleterId, state: true })
        if (!deleter) return res.status(400).json({ message: 'Personnel inexistant !' })
        if (deleter.state == false) return res.status(400).json({ message: "Personnel inactif !" })
        if (deleter.permission != "admin") return res.status(400).json({ message: "Personnel non autorise!" })
        const patient = await PatientModel.findById({ _id: exam.patient_id, state: true })
        if (!patient) return res.status(400).json({ message: 'Patient inexistant !' })
        if (patient.state == false) return res.status(400).json({ message: 'Patient inactif !' })

        const exam = await examModel.findById({ _id: req.params.examId, state: true })
        if (!exam) return res.status(400).json({ message: 'Examen inexistant !' })
        if (exam.state == false) return res.status(400).json({ message: "Examen inactif !" })
        await examModel.findByIdAndUpdate({ _id: req.params.examId }, { state: false })
        await MetadataModel.findByIdAndUpdate({ _id: exam.metadata_id }, { state: false })
        res.status(200).json({ message: "Archivage de l'Examen " + exam.filename + " avec succès !" })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }

}