const ExamTypeModel = require('../models/ExamTypeModel')
const MedicalStaffModel = require('../models/MedicalStaffModel')

module.exports.getAllExamType = async(req, res) => {
    try {
        const allExamTypes = await ExamTypeModel.find({ state: true })
        if (allExamTypes.length == 0) return res.status(404).json({ message: 'Aucun type d\'examen !' })
        res.status(200).json({ examTypes: allExamTypes })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}
module.exports.addOneExamType = async(req, res) => {
    try {
        if (await ExamTypeModel.findOne({ examType: req.body.examType.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) })) {
            return res.status(400).json({ message: 'Type d\'examen déjà existant !' })
        }
        const newExamType = new ExamTypeModel({
            examType: req.body.examType.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
        })

        const examTypeData = await newExamType.save()
        res.status(200).json({ examType: examTypeData })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

module.exports.updateOneExamType = async(req, res) => {
    const examType = await ExamTypeModel.findById({ _id: req.params.examTypeId })
    if (!examType) return res.status(404).json({ message: "Type d\'examen inexistant !" })
    if (examType.state == false) return res.status(400).json({ message: "Type d\'examen inactif !" })

    const updater = await MedicalStaffModel.findById({ _id: req.params.updaterId })
    if (!updater) return res.status(404).json({ message: "Personnel inexistant !" })
    if (updater.permission != 'admin') return res.status(400).json({ message: "Personnel non autorisé !" })

    try {
        if (await ExamTypeModel.findOne({ examType: req.body.examType.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) })) {
            return res.status(400).json({ message: 'Type d\'examen déjà existant !' })
        }

        const examTypeData = await ExamTypeModel.findByIdAndUpdate({ _id: req.params.examTypeId }, {
            $set: {
                examType: req.body.examType.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
            }
        })
        res.status(200).json({ examType: examTypeData })

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

module.exports.deleteOneExamType = async(req, res) => {
    const examType = await ExamTypeModel.findById({ _id: req.params.examTypeId })
    if (!examType) return res.status(404).json({ message: "Type d\'examen inexistant !" })
    if (examType.state == false) return res.status(400).json({ message: "Type d\'examen inactif !" })

    const deleter = await MedicalStaffModel.findById({ _id: req.params.deleterId })
    if (!deleter) return res.status(404).json({ message: "Personnel inexistant !" })
    if (deleter.permission != 'admin') return res.status(400).json({ message: "Personnel non autorisé !" })

    try {
        await ExamTypeModel.findByIdAndUpdate({ _id: req.params.examTypeId }, { $set: { state: false } })
        res.status(200).json("Archivage du type d\'examen " + examType.examType + " avec succès !")
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}